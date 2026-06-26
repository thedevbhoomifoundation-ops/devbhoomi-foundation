import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import ReactPDF from "@react-pdf/renderer";
import { v2 as cloudinary } from "cloudinary";
import QRCode from "qrcode";
import { IDCardDocument } from "@/lib/pdf/id-card";
import { CertificateDocument } from "@/lib/pdf/certificate";
import {
  sendEmail,
  getShortlistedEmail,
  getSelectedEmail,
  getRejectedEmail,
  getCompletedEmail
} from "@/lib/email";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function PATCH(
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
    const { status, comment } = await req.json();

    const allowedStatuses = [
      "PENDING",
      "UNDER_REVIEW",
      "SHORTLISTED",
      "SELECTED",
      "REJECTED",
      "INTERNSHIP_ACTIVE",
      "COMPLETED",
      "CERTIFIED"
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Fetch the application
    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 450 });
    }

    const updatedApp = await prisma.$transaction(async (tx) => {
      // 1. Update status
      const app = await tx.internshipApplication.update({
        where: { id },
        data: { status },
      });

      // 2. Log history
      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          status,
          changedBy: userId,
          comment: comment || `Status updated to ${status} by admin.`,
        },
      });

      return app;
    });

    // Handle asynchronous side effects (PDF generation & emails)
    let idCardUrl = "";
    let certificateUrl = "";

    // 1. Trigger ID Card PDF generation if SELECTED
    if (status === "SELECTED") {
      try {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const internId = `IMS-INTERN-${randomSuffix}`;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const verificationUrl = `${appUrl}/verify/${internId}`;
        const qrCodeUrl = await QRCode.toDataURL(verificationUrl, { margin: 1, width: 150 });

        // Retrieve photo URL
        const docs = await prisma.uploadedDocument.findMany({ where: { applicationId: id } });
        const photoUrl = docs.find((d) => d.type === "PHOTO")?.url || "https://res.cloudinary.com/dmc9caq5i/image/upload/v1718250000/placeholder.jpg";

        const pdfStream = await ReactPDF.renderToStream(
          React.createElement(IDCardDocument, {
            name: application.fullName,
            internId: internId,
            domain: application.domain,
            duration: "8 Weeks",
            photoUrl: photoUrl,
            qrCodeUrl: qrCodeUrl,
          }) as any
        );

        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "ims-idcards",
              resource_type: "raw",
              public_id: `idcard_${id}`,
              format: "pdf",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          pdfStream.pipe(uploadStream);
        });

        await prisma.generatedIDCard.upsert({
          where: { applicationId: id },
          update: { pdfUrl: uploadResult.secure_url, internId, qrCodeUrl },
          create: { applicationId: id, pdfUrl: uploadResult.secure_url, internId, qrCodeUrl },
        });

        idCardUrl = uploadResult.secure_url;

        // Send confirmation email
        const emailHtml = getSelectedEmail(application.fullName, id, application.domain);
        await sendEmail({
          to: application.email,
          subject: "Internship Selection Confirmation - NextGen Devbhoomi Foundation",
          html: emailHtml,
          type: "SELECTED",
        });
      } catch (err) {
        console.error("ID Card generation during status change failed:", err);
      }
    }

    // 2. Trigger Certificate PDF generation if COMPLETED
    if (status === "COMPLETED") {
      try {
        const randomSuffix = Math.floor(10000 + Math.random() * 90000);
        const certificateNumber = `IMS-CERT-${randomSuffix}`;
        const verificationCode = `IMS-VERIFY-${randomSuffix}`;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const verificationUrl = `${appUrl}/verify/${verificationCode}`;
        const qrCodeUrl = await QRCode.toDataURL(verificationUrl, { margin: 1, width: 150 });

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
            certificateNumber: certificateNumber,
            qrCodeUrl: qrCodeUrl,
          }) as any
        );

        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "ims-certificates",
              resource_type: "raw",
              public_id: `cert_${id}`,
              format: "pdf",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          pdfStream.pipe(uploadStream);
        });

        await prisma.generatedCertificate.upsert({
          where: { applicationId: id },
          update: { pdfUrl: uploadResult.secure_url, certificateNumber, verificationCode },
          create: { applicationId: id, pdfUrl: uploadResult.secure_url, certificateNumber, verificationCode },
        });

        certificateUrl = uploadResult.secure_url;

        // Send completion email
        const emailHtml = getCompletedEmail(application.fullName, id, application.domain, certificateNumber);
        await sendEmail({
          to: application.email,
          subject: "Internship Completed! - NextGen Devbhoomi Foundation",
          html: emailHtml,
          type: "COMPLETED",
        });
      } catch (err) {
        console.error("Certificate generation during status change failed:", err);
      }
    }

    // 3. Email notifications for other statuses
    if (status === "SHORTLISTED") {
      const emailHtml = getShortlistedEmail(application.fullName, id);
      await sendEmail({
        to: application.email,
        subject: "Congratulations! You are shortlisted - NextGen Devbhoomi Foundation",
        html: emailHtml,
        type: "SHORTLISTED",
      });
    } else if (status === "REJECTED") {
      const emailHtml = getRejectedEmail(application.fullName, id);
      await sendEmail({
        to: application.email,
        subject: "Application Status Update - NextGen Devbhoomi Foundation",
        html: emailHtml,
        type: "REJECTED",
      });
    }

    return NextResponse.json({
      success: true,
      status: updatedApp.status,
      idCardUrl,
      certificateUrl,
    });
  } catch (error: any) {
    console.error("Failed to update application status:", error);
    return NextResponse.json(
      { error: "Status update failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
