// app/page.tsx
"use client";

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function App() {
    /*const { data: session } = useSession();
    const router = useRouter();
        
    // Redirect to sign in page if not signed in
    if(!session){
      router.replace("/auth/signin")
    }*/

    const router = useRouter();
    router.replace("/home");
}
