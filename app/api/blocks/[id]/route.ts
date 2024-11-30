import { NextResponse } from "next/server";
import { db } from "@/db";
import { contentBlocks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const block = await db
      .select()
      .from(contentBlocks)
      .where(eq(contentBlocks.id, params.id))
      .limit(1);

    if (!block.length) {
      return NextResponse.json({ error: "Content block not found" }, { status: 404 });
    }

    return NextResponse.json(block[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content block" },
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
      .update(contentBlocks)
      .set(data)
      .where(eq(contentBlocks.id, params.id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update content block" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(contentBlocks).where(eq(contentBlocks.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete content block" },
      { status: 500 }
    );
  }
}