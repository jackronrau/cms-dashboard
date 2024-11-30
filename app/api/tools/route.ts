import { NextResponse } from "next/server";
import { db } from "@/db";
import { tools } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allTools = await db.select().from(tools);
    console.log("allTools", allTools);
    return NextResponse.json(allTools);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await db.insert(tools).values(data).returning();
        console.log("data:", result);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tool" }, { status: 500 });
  }
}