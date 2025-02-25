// Environment Variables
import 'dotenv/config';

// Drizzle ORM
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.SUPABASE_DATABASE_URL!,
    },
});