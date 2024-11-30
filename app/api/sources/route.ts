import { NextResponse } from "next/server";
import { db } from "@/db";
import { contentSources } from "@/db/schema";

export async function GET() {
  try {
    const allSources = await db.select().from(contentSources);
    return NextResponse.json(allSources);
  } catch (error) {
    console.error("Error fetching content sources:", error);
    return NextResponse.json(
      { error: "Failed to fetch content sources" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await db.insert(contentSources).values(data).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating content source:", error);
    return NextResponse.json(
      { error: "Failed to create content source" },
      { status: 500 }
    );
  }
}