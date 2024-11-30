import { NextResponse } from "next/server";
import { db } from "@/db";
import { tools } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tool = await db
      .select()
      .from(tools)
      .where(eq(tools.id, params.id))
      .limit(1);

    if (!tool.length) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json(tool[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const result = await db
      .update(tools)
      .set(data)
      .where(eq(tools.id, params.id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(tools).where(eq(tools.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
}