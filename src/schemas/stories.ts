import { pgTable, serial, varchar, json, timestamp, integer, foreignKey, jsonb } from "drizzle-orm/pg-core";
import { users } from '@/schemas/users';
import { relations } from "drizzle-orm";
import { Segments } from "@/models/SegmentData";

// Define the stories table
export const stories = pgTable('stories', 
  {
    id: serial('id').primaryKey(),
    input: varchar('input', { length: 1000 }).notNull(),
    segments: jsonb('segments').$type<Segments>(),
    story: varchar('story'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(), // Automatically updated timestamp
    userId: integer('user_id').notNull().references(() => users.id) // Reference to the user who created the story
  },
);

export const storiesRelations = relations(stories, ({ one, many }) => ({
  user: one(users, {
    fields: [stories.userId],
    references: [users.id],
  }),
}));