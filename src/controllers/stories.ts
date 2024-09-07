import db from '@/lib/db'; // Assuming you have a database connection file
import { stories } from '@/schemas/stories';
import logger from '@/lib/logging';

// Function to create a story for given user
async function createStory(userId: number, input: string, segments: JSON) {
  const story = await db.insert(stories).values({
    input: input,
    segments: segments,
    userId: userId, // Reference to userId
  }).returning();
  
  logger.info('Story Created:', story);
  return story;
}
