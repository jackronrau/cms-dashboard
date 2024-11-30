import { NextResponse } from "next/server";
import { db } from "@/db";
import { resources } from "@/db/schema";

export async function GET() {
  try {
    const allResources = await db.select().from(resources);
    return NextResponse.json(allResources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await db.insert(resources).values(data).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}