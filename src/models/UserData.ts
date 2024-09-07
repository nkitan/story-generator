interface userProfile {
    name: string,
    avatar: string,
};
  
interface userData {
    email: string,
    provider: string,
    providerId: string,
    username: string,
    profile: userProfile,
};

export type { userData, userProfile };