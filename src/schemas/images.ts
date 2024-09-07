import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { segments } from "@/schemas/segments";
import { relations } from "drizzle-orm";

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  md5sum: varchar('md5sum', { length: 255 }).notNull(), // MD5 checksum for image integrity verification
  link: varchar('link', { length: 1024 }).notNull() // Link to the image (could be S3, CDN, etc.)
});