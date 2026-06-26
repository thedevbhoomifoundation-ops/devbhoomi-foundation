import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(
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

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
      include: {
        documents: true,
        idCard: true,
        certificate: true,
        statusHistory: {
          orderBy: { changedAt: "desc" },
        },
        adminNotes: {
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 450 });
    }

    return NextResponse.json(application);
  } catch (error: any) {
    console.error("Admin fetch application error:", error);
    return NextResponse.json(
      { error: "Fetch failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}

// POST to add admin notes
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
    const { note } = await req.json();

    if (!note || note.trim() === "") {
      return NextResponse.json({ error: "Note content is required" }, { status: 400 });
    }

    // Ensure the admin exists as a User in our DB (referential integrity)
    // Clerk user should be synced. We upsert.
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: sessionClaims?.email as string || "admin@nextgendevbhoomi.org",
        name: "Administrator",
        roles: ["ADMIN"],
      },
    });

    const newNote = await prisma.adminNote.create({
      data: {
        applicationId: id,
        authorId: userId,
        note: note.trim(),
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(newNote);
  } catch (error: any) {
    console.error("Admin create note error:", error);
    return NextResponse.json(
      { error: "Create note failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
