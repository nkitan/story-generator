import { pgTable, integer, foreignKey } from "drizzle-orm/pg-core";
import { stories } from './stories';
import { images } from './images';

// Define the story_images junction table to link stories and images
export const storyImages = pgTable('story_images', {
  storyId: integer('story_id').notNull(),
  imageId: integer('image_id').notNull(),
}, 
  (table) => {
    return {
      storyForeignKey: foreignKey({
        columns: [table.storyId],  // Reference to story_id in story_images
        foreignColumns: [stories.id] // Reference to id in stories
      }),
      imageForeignKey: foreignKey({
        columns: [table.imageId],  // Reference to image_id in story_images
        foreignColumns: [images.id] // Reference to id in images
      })
    };
  }
);
