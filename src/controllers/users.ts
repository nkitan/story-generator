import db from '@/lib/db'; // Assuming you have a database connection file
import { userData, userProfile } from '@/models/UserData';
import { users } from "@/schemas/users";
import logger from '@/lib/logging';
import { eq } from 'drizzle-orm';

// Function to create a test user
export async function createUser(user: userData) {
  try{
    const newUser = await db.insert(users).values({
      email: user.email,
      provider: user.provider, // OAuth provider
      providerId: user.providerId,
      username: user.username,
      profile: user.profile
    }).returning();
    
    return newUser[0] as userData; // return user
  } catch(error: any) {
    logger.error(`Failed to create user: ${error.message}`);
    throw new Error("USER CREATION FAILED");
  }
}

export async function getUserById(userId: number) {
  logger.info(`Fetching user with ID: ${userId}`);
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));
    
    if (user.length === 0) {
      logger.warn(`User with ID: ${userId} not found`);
      return null;
    }
    
    const returnUser: userData = {
      email: user[0].email,
      provider: user[0].provider,
      providerId: user[0].providerId,
      username: user[0].username,
      profile: user[0].profile as userProfile,
    }

    logger.info(`User with ID: ${userId} found: ${JSON.stringify(user[0])}`);
    return returnUser;
  } catch (error: any) {
    logger.error(`Error fetching user with ID: ${userId}. Error: ${error.message}`);
    throw new Error("COULDN'T FIND USER");
  }
}