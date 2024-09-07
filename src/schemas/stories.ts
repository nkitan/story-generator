import { pgTable, serial, varchar, json, timestamp, integer, foreignKey } from "drizzle-orm/pg-core";
import { users } from '@/schemas/users';
import { segments } from "@/schemas/segments";
import { relations } from "drizzle-orm";

// Define the stories table
export const stories = pgTable('stories', 
  {
    id: serial('id').primaryKey(),
    input: varchar('input', { length: 1000 }).notNull(),
    segments: serial('segments'),
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
  segments: many(segments),
}));