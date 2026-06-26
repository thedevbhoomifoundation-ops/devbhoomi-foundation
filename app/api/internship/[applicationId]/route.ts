import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { applicationId } = await params;

    const application = await prisma.internshipApplication.findUnique({
      where: { id: applicationId },
      include: {
        documents: true,
        idCard: true,
        certificate: true,
        statusHistory: {
          orderBy: { changedAt: "desc" },
        },
        adminNotes: {
          select: {
            id: true,
            note: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 450 });
    }

    // Verify ownership
    if (application.userId !== userId) {
      return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    return NextResponse.json(application);
  } catch (error: any) {
    console.error("Failed to fetch application details:", error);
    return NextResponse.json(
      { error: "Fetch failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
