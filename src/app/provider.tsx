"use client";

import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({ session, children} : { session: Session | null, children: React.ReactNode }){
    return (
        <>
            <DarkModeToggle className={"absolute top-3 right-6 xl:top-5 z-50"}/>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </>
    )
}