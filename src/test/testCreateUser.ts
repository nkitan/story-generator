import { generateUser } from "@/controllers/users"
import logger from '@/lib/logging';
import { userData } from "@/models/UserData";
import GenerateAvatar from "@/util/Avatars";

export const generateTestUser = () => { 
    const testUser: userData = {
        email: "ankitdas@gmail.com",
        provider: "google",
        provider_id: "google-provider-id",
        username: "ankit",
        profile: {
            name: "Ankit Das",
            avatar: GenerateAvatar()
        }
    }
    
    try {
        const user = generateUser(testUser);
        return user;
    } catch(err) {
        logger.error(err);
    }
}

