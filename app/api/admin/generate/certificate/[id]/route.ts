import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import ReactPDF from "@react-pdf/renderer";
import { v2 as cloudinary } from "cloudinary";
import QRCode from "qrcode";
import { CertificateDocument } from "@/lib/pdf/certificate";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, sessionClaims } = await auth();
    const roles = (sessionClaims?.publicMetadata as { roles?: string[] })?.roles || [];

    if (!userId || !roles.includes("ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    // Fetch application details
    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 450 });
    }

    // Generate Certificate Number & Verification Code
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const certificateNumber = `IMS-CERT-${randomSuffix}`;
    const verificationCode = `IMS-VERIFY-${randomSuffix}`;

    // Create verification URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationUrl = `${appUrl}/verify/${verificationCode}`;

    // Generate QR Code as base64 data URL
    const qrCodeUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 150,
    });

    // Render PDF to stream
    const pdfStream = await ReactPDF.renderToStream(
      React.createElement(CertificateDocument, {
        name: application.fullName,
        domain: application.domain,
        duration: "8 Weeks",
        completionDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        certificateNumber,
        qrCodeUrl,
      }) as any
    );

    // Upload stream to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ims-certificates",
          resource_type: "raw",
          public_id: `cert_${id}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      pdfStream.pipe(uploadStream);
    });

    // Save generated Certificate record in database
    const generatedCertificate = await prisma.generatedCertificate.upsert({
      where: { applicationId: id },
      update: {
        pdfUrl: uploadResult.secure_url,
        certificateNumber,
        verificationCode,
      },
      create: {
        applicationId: id,
        pdfUrl: uploadResult.secure_url,
        certificateNumber,
        verificationCode,
      },
    });

    return NextResponse.json({
      success: true,
      certificate: generatedCertificate,
    });
  } catch (error: any) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Generation failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
