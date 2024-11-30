import { NextResponse } from "next/server";
import { db } from "@/db";
import { contentSources } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const source = await db
      .select()
      .from(contentSources)
      .where(eq(contentSources.id, params.id))
      .limit(1);

    if (!source.length) {
      return NextResponse.json({ error: "Content source not found" }, { status: 404 });
    }

    return NextResponse.json(source[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content source" },
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
      .update(contentSources)
      .set(data)
      .where(eq(contentSources.id, params.id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update content source" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(contentSources).where(eq(contentSources.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete content source" },
      { status: 500 }
    );
  }
}