import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    const roles = (sessionClaims?.publicMetadata as { roles?: string[] })?.roles || [];

    if (!userId || !roles.includes("ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const domain = searchParams.get("domain") || "";
    const sortBy = searchParams.get("sortBy") || "appliedDate";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Build query conditions
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (domain) {
      where.domain = domain;
    }

    if (search) {
      where.OR = [
        { id: { contains: search, mode: "insensitive" } },
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { collegeName: { contains: search, mode: "insensitive" } },
      ];
    }

    // Run parallel count and list queries
    const [total, applications] = await Promise.all([
      prisma.internshipApplication.count({ where }),
      prisma.internshipApplication.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        include: {
          documents: true,
          statusHistory: {
            orderBy: { changedAt: "desc" },
          },
        },
      }),
    ]);

    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Admin applications fetch error:", error);
    return NextResponse.json(
      { error: "Fetch failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
