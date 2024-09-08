import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, json, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";
import { stories } from "@/schemas/stories";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  provider: varchar('provider', { length: 50 }).notNull(), // OAuth provider (e.g., Google, GitHub)
  providerId: varchar('provider_id', { length: 255 }).notNull(), // Unique ID from OAuth provider
  username: varchar('username', { length: 100 }).notNull(),
  profile: json('profile'), // Store additional profile information like name, avatar, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
  role: varchar('role', { length: 10}).notNull().default("user"),
},
  (table) => {
    return {
      providerEmailIndex: uniqueIndex('provider_email_idx').on(table.provider, table.email),
      emailIndex: index('email_idx').on(table.email), // Regular index on the email column
    };
  }
);

export const usersRelations = relations(users, ({ many }) => ({
  stories: many(stories),
}));