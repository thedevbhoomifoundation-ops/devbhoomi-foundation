import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { InternshipApplicationSchema } from "@/lib/validators/internship";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate request body
    const validationResult = InternshipApplicationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Upsert User in database
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        name: data.fullName,
        email: data.email,
      },
      create: {
        id: userId,
        name: data.fullName,
        email: data.email,
        roles: ["STUDENT"],
      },
    });

    // Check if an application already exists for this user in the selected domain
    const existingApplication = await prisma.internshipApplication.findFirst({
      where: {
        userId,
        domain: data.domain,
        status: {
          notIn: ["REJECTED", "COMPLETED"],
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: `You already have an active application for ${data.domain}` },
        { status: 409 }
      );
    }

    // Generate unique Application ID: IMS-YYYY-XXXXX
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const applicationId = `IMS-${year}-${randomSuffix}`;

    // Create program if not exists (General program for default)
    let program = await prisma.internshipProgram.findFirst({
      where: { title: `${data.domain} Internship Program ${year}` },
    });

    if (!program) {
      program = await prisma.internshipProgram.create({
        data: {
          title: `${data.domain} Internship Program ${year}`,
          description: `Comprehensive technical internship in ${data.domain} for ${year} cohorts.`,
          duration: "8 Weeks",
          status: "ACTIVE",
        },
      });
    }

    // Create the application inside a transaction to guarantee atomic database updates
    const newApplication = await prisma.$transaction(async (tx) => {
      // 1. Create the application
      const app = await tx.internshipApplication.create({
        data: {
          id: applicationId,
          userId,
          programId: program.id,
          status: "PENDING",
          domain: data.domain,
          fullName: data.fullName,
          email: data.email,
          mobile: data.mobile,
          gender: data.gender,
          dateOfBirth: new Date(data.dateOfBirth),
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          collegeName: data.collegeName,
          university: data.university,
          degree: data.degree,
          branch: data.branch,
          currentYearSem: data.currentYearSem,
          graduationYear: data.graduationYear,
          cgpa: data.cgpa,
          skills: data.skills,
          programmingLanguages: data.programmingLanguages,
          projects: data.projects,
          portfolioUrl: data.portfolioUrl || null,
          githubUrl: data.githubUrl || null,
          linkedinUrl: data.linkedinUrl || null,
          availableHours: data.availableHours,
          whyJoin: data.whyJoin,
        },
      });

      // 2. Create UploadedDocuments
      const docData = [
        { applicationId, type: "RESUME", url: data.resumeUrl, fileName: "Resume.pdf" },
        { applicationId, type: "PHOTO", url: data.photoUrl, fileName: "Profile_Photo.jpg" },
      ];

      if (data.collegeIdUrl) {
        docData.push({
          applicationId,
          type: "COLLEGE_ID",
          url: data.collegeIdUrl,
          fileName: "College_ID.jpg",
        });
      }

      await tx.uploadedDocument.createMany({
        data: docData,
      });

      // 3. Create initial status history entry
      await tx.applicationStatusHistory.create({
        data: {
          applicationId,
          status: "PENDING",
          changedBy: userId,
          comment: "Application submitted successfully by student.",
        },
      });

      return app;
    });

    // Send confirmation email (We'll integrate real Resend templates in Phase 8, but log it now)
    try {
      await prisma.emailLog.create({
        data: {
          to: data.email,
          subject: "Application Received - NextGen Devbhoomi Foundation",
          type: "SUBMITTED",
          status: "PENDING",
        },
      });
      
      // Call async send helper or trigger background task
      // For now we will trigger it dynamically when Resend helper is created.
    } catch (emailErr) {
      console.error("Failed to log email trigger:", emailErr);
    }

    return NextResponse.json({
      success: true,
      applicationId: newApplication.id,
      status: newApplication.status,
    });
  } catch (error: any) {
    console.error("Failed to submit internship application:", error);
    return NextResponse.json(
      { error: "Submission failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
