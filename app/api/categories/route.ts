import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { getAllCategories } from "@/lib/services/category-service";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("dat", data)
    
    // Insert the new category
    const result = await db
      .insert(categories)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        displayOrder: data.displayOrder,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}