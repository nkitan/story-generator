"use server";

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import logger from "@/lib/logging";

// Read the root certificate file
const rootCert = fs.readFileSync(path.resolve(__dirname, "certs/root.crt"));

// Use a connection string for CockroachDB
const auth = `${process.env.ROACHDB_ADMIN_USER}${process.env.ROACHDB_ADMIN_PASSWORD}`
const connectionString = `postgresql:${auth}${process.env.ROACHDB_CONNECTION_STRING}`
console.log("Connecting to Database: ", connectionString);

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    ca: rootCert,
    rejectUnauthorized: true // Enforces SSL certificate validation
  }
});

const db = drizzle(pool);
export default db;
