// // dont modify this file
// import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// // Initialize drizzle with D1
// export const db = drizzle(process.env.DATABASE as D1Database, { schema });

import { drizzle } from 'drizzle-orm/sqlite-proxy';

export const db = drizzle(async (sql, params, method) => {
  console.log({sql, params, method})
  try {
    return await fetch(`https://frp.maxd.cloud:17922/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sql, params, method }),
    }).then((res) => res.json()).catch(() => ({rows: []}))
  } catch (e: any) {
    console.error("Error from sqlite proxy server: ", e.response.data);
    return { rows: [] };
  }
});

// Simple helper function to test database connection
export async function initializeDatabase() {
  try {
    // Test connection with a simple query
    const tools = await db.select().from(schema.tools).limit(1).all();
    console.log('✅ Database connection established');
    console.log('Sample query result:', tools);
    return tools;
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    throw error;
  }
}
