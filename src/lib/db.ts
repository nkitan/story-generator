import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import logger from "@/lib/logging";
const sql = neon(process.env.DRIZZLE_DATABASE_URL || "postgresql://admin:admin@127.0.0.1/storygenerator-db?");
const db = drizzle(sql);

export default db;
