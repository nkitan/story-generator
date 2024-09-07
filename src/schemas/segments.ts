import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { images } from "@/schemas/images";
import { relations } from "drizzle-orm";

export const segments = pgTable('segments', {
  id: serial('id').primaryKey(),
  text: varchar('text').notNull(), // MD5 checksum for image integrity verification
  imageId: serial('image_id').references(() => images.id), // refer to image for current segment
});

export const segmentsRelations = relations(segments, ({ one }) => ({
    image: one(images)
}));
  