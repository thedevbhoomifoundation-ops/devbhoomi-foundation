import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.internshipApplication.findMany({
      where: { userId },
      include: {
        documents: true,
        idCard: true,
        certificate: true,
        statusHistory: {
          orderBy: { changedAt: "desc" },
        },
      },
      orderBy: { appliedDate: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error: any) {
    console.error("Failed to fetch applications list:", error);
    return NextResponse.json(
      { error: "Fetch failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
