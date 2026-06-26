import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import ReactPDF from "@react-pdf/renderer";
import { v2 as cloudinary } from "cloudinary";
import QRCode from "qrcode";
import { IDCardDocument } from "@/lib/pdf/id-card";

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
      include: { documents: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 450 });
    }

    // Generate Intern ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const internId = `IMS-INTERN-${randomSuffix}`;

    // Create verification URL pointing to the app verify page
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationUrl = `${appUrl}/verify/${internId}`;

    // Generate QR Code as base64 image data URL
    const qrCodeUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 150,
    });

    // Render PDF to stream
    const pdfStream = await ReactPDF.renderToStream(
      React.createElement(IDCardDocument, {
        name: application.fullName,
        internId,
        domain: application.domain,
        duration: "8 Weeks",
        photoUrl: (application.documents as any)?.find((d: any) => d.type === "PHOTO")?.url || "https://res.cloudinary.com/dmc9caq5i/image/upload/v1718250000/placeholder.jpg",
        qrCodeUrl,
      }) as any
    );

    // Upload stream to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ims-idcards",
          resource_type: "raw",
          public_id: `idcard_${id}`,
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

    // Save generated ID Card record in database
    const generatedIDCard = await prisma.generatedIDCard.upsert({
      where: { applicationId: id },
      update: {
        pdfUrl: uploadResult.secure_url,
        internId,
        qrCodeUrl,
      },
      create: {
        applicationId: id,
        pdfUrl: uploadResult.secure_url,
        internId,
        qrCodeUrl,
      },
    });

    return NextResponse.json({
      success: true,
      idCard: generatedIDCard,
    });
  } catch (error: any) {
    console.error("ID Card generation error:", error);
    return NextResponse.json(
      { error: "Generation failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
