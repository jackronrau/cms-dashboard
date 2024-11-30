import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const results = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        displayOrder: categories.displayOrder,
      })
      .from(categories)
      .orderBy(asc(categories.displayOrder));
    
    return results;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}