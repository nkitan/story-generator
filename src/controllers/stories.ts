import db from '@/lib/db'; // Assuming you have a database connection file
import { stories } from '@/schemas/stories';
import logger from '@/lib/logging';
import { Segments } from '@/models/SegmentData';
import { eq } from 'drizzle-orm';

// Function to create a story for given user
async function generateSegments(userId: number, input: string, segments: Segments) {
  const story = await db.insert(stories).values({
    input: input,
    segments: segments,
    userId: userId, // Reference to userId
  }).returning();
  
  logger.info(`Story Created: ${story}`);
  return story;
}

async function addInput(storyId: number, input: string){
  try {
    await db
    .update(stories)
    .set({
      input: input
    })
    .where(eq(stories.id, storyId));  // Update where id is '1'

    return { message: "Input Added Successfully"};
  } catch(err: any) {
    logger.error(`Error Adding Input: ${storyId}. Error: ${err.message}`);
    throw new Error("COULDN'T ADD INPUT");
  }
}

async function addStory(storyId: number, story: string){
  try {
    await db
    .update(stories)
    .set({
      story: story
    })
    .where(eq(stories.id, storyId));  // Update where id is '1'  
  } catch(err: any) {
    logger.error(`Error Adding Story: ${storyId}. Error: ${err.message}`);
    throw new Error("COULDN'T ADD STORY");
  }
}

export { addStory, addInput, generateSegments};