// app/page.tsx
"use client";

import { useSession, signIn } from 'next-auth/react';
import Dashboard from '@/app/dashboard/page';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const { data: session } = useSession();
    const router = useRouter();
        
    // Redirect to sign in page if not signed in
    if(!session){
      router.replace("/auth/signin")
    }

    return (
      <div>
          <Dashboard />
      </div>
    );
}
