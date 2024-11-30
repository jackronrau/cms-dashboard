import { NextResponse } from "next/server";
import { db } from "@/db";
import { contentBlocks } from "@/db/schema";

export async function GET() {
  try {
    const allBlocks = await db.select().from(contentBlocks);
    return NextResponse.json(allBlocks);
  } catch (error) {
    console.error("Error fetching content blocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch content blocks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await db.insert(contentBlocks).values(data).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating content block:", error);
    return NextResponse.json(
      { error: "Failed to create content block" },
      { status: 500 }
    );
  }
}