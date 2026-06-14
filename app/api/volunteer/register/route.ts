import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { VolunteerRegistrationSchema } from "@/lib/validators/volunteer";

const getClerkClient = async () => {
  if (typeof clerkClient === "function") {
    return await clerkClient();
  }
  return clerkClient;
};

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate body
    const validationResult = VolunteerRegistrationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Resolve current roles
    const currentRoles = (sessionClaims?.publicMetadata as { roles?: string[] })?.roles || ["STUDENT"];
    const updatedRoles = Array.from(new Set([...currentRoles, "VOLUNTEER"]));

    // Local DB update
    await prisma.$transaction(async (tx) => {
      // 1. Upsert User with updated roles list
      await tx.user.upsert({
        where: { id: userId },
        update: {
          name: data.fullName,
          email: data.email,
          roles: updatedRoles as any[], // Casting for Prisma enum array compatibility
        },
        create: {
          id: userId,
          name: data.fullName,
          email: data.email,
          roles: ["STUDENT", "VOLUNTEER"],
        },
      });

      // 2. Create Volunteer application log
      await tx.volunteerApplication.create({
        data: {
          userId,
          fullName: data.fullName,
          email: data.email,
          mobile: data.mobile,
          skills: data.skills,
          areaOfInterest: data.areaOfInterest,
          availability: data.availability,
          experience: data.experience,
          status: "APPROVED", // Auto-approved since they are logged-in student applying directly
        },
      });
    });

    // Update Clerk User Metadata
    try {
      const client = await getClerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          roles: updatedRoles,
        },
      });
    } catch (clerkErr) {
      console.error("Clerk metadata sync failed:", clerkErr);
      // We don't fail the whole request since DB was updated.
    }

    // Create Email Log
    try {
      await prisma.emailLog.create({
        data: {
          to: data.email,
          subject: "Volunteer Registration Confirmed - NextGen Devbhoomi Foundation",
          type: "VOLUNTEER_REGISTERED",
          status: "PENDING",
        },
      });
    } catch (emailErr) {
      console.error("Failed to write email log:", emailErr);
    }

    return NextResponse.json({
      success: true,
      roles: updatedRoles,
    });
  } catch (error: any) {
    console.error("Failed to register volunteer:", error);
    return NextResponse.json(
      { error: "Registration failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
