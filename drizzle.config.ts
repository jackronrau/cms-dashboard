import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './db/schema.ts',
  out: './drizzle/migrations',
  driver: "d1-http",
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID,
        databaseId: process.env.DATABASE,
        token: process.env.CLOUDFLARE_D1_API_TOKEN,
      }, 
  verbose: true,
  strict: true,
} satisfies Config;