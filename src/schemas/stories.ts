import { pgTable, serial, varchar, json, timestamp, integer, foreignKey } from "drizzle-orm/pg-core";
import { users } from './users';

// Define the stories table
export const stories = pgTable('stories', {
  id: serial('id').primaryKey(),
  input: varchar('input', { length: 1000 }).notNull(),
  segments: json('segments').notNull(), // JSON containing the story segments
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()).notNull(), // Automatically updated timestamp
  userId: integer('user_id').notNull(), // Reference to the user who created the story
},
  (table) => {
    return {
      userForeignKey: foreignKey({
        columns: [table.userId],  // Reference to user_id in stories
        foreignColumns: [users.id] // Reference to id in users
      }),
    };
  }
);
