import { db } from "@/db";
import { tools, toolsToCategories, categories, githubData } from "@/db/schema";
import { eq, desc, gt } from "drizzle-orm";
import type { Tool } from "@/types";

async function mapToolResult(result: any): Promise<Tool> {
  // Get categories for the tool
  const categoryResults = await db
    .select({
      name: categories.name
    })
    .from(toolsToCategories)
    .leftJoin(categories, eq(categories.id, toolsToCategories.categoryId))
    .where(eq(toolsToCategories.toolId, result.id));

  // Get GitHub data if it exists
  const githubResult = await db
    .select()
    .from(githubData)
    .where(eq(githubData.toolId, result.id))
    .limit(1);

  return {
    ...result,
    categories: categoryResults.map(cat => cat.name),
    githubData: githubResult[0] ? {
      repoUrl: githubResult[0].repoUrl,
      stars: githubResult[0].stars,
      forks: githubResult[0].forks,
      weeklyGrowth: githubResult[0].weeklyGrowth || 0,
      license: githubResult[0].license || '',
      lastUpdated: new Date(githubResult[0].lastUpdated)
    } : undefined
  };
}

export async function getAllTools(): Promise<Tool[]> {
  try {
    const results = await db.select().from(tools);
    const mappedTools = await Promise.all(results.map(mapToolResult));
    return mappedTools;
  } catch (error) {
    console.error('Error fetching all tools:', error);
    return [];
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const result = await db
      .select()
      .from(tools)
      .where(eq(tools.slug, slug))
      .limit(1);

    if (!result.length) return null;
    
    return await mapToolResult(result[0]);
  } catch (error) {
    console.error('Error fetching tool by slug:', error);
    return null;
  }
}

export async function getTrendingTools(): Promise<Tool[]> {
  try {
    const results = await db
      .select()
      .from(tools)
      .where(gt(tools.ranking, 0))
      .orderBy(desc(tools.ranking))
      .limit(6);

    const mappedTools = await Promise.all(results.map(mapToolResult));
    return mappedTools;
  } catch (error) {
    console.error('Error fetching trending tools:', error);
    return [];
  }
}