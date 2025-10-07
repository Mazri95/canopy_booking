import { PrismaClient } from '@prisma/client';

// Prefer Supabase in dev if provided. Mirror into both env names so
// the Prisma Client works regardless of which schema it was generated from.
if (process.env.SUPABASE_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;
  process.env.SUPABASE_DATABASE_URL = process.env.SUPABASE_DATABASE_URL;
}

const prisma = new PrismaClient();

export default prisma;


