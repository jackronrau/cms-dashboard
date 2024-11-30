import { NextResponse } from "next/server";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resource = await db
      .select()
      .from(resources)
      .where(eq(resources.id, params.id))
      .limit(1);

    if (!resource.length) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json(resource[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
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
      .update(resources)
      .set(data)
      .where(eq(resources.id, params.id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(resources).where(eq(resources.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}