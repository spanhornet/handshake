// PostgreSQL
import postgres from 'postgres';

// Environment Variables
import { config } from 'dotenv';

// Drizzle ORM
import { drizzle } from 'drizzle-orm/postgres-js';

// Database Schema
import { schema } from "@/db/schema";

config({ path: '.env' });

const client = postgres(process.env.SUPABASE_DATABASE_URL!, { prepare: false });
export const db = drizzle({ client, schema });