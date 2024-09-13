"use client";

import AnimationWrapper from "@/components/motion/animationwrapper";
import Icons from "@/components/icons/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/components/ui/userbutton";
import { useSession } from "next-auth/react";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";

const Navbar = async () => {
    const session = useSession();

    return (
        <header className="px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
            <DarkModeToggle className={"absolute top-3 right-6 xl:top-5 z-[99999]"}/>
            <AnimationWrapper reverse>
                <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
                    <div className="flex items-start">
                        <Link href="/" className="flex items-center gap-2">
                            <Icons.logo className="w-8 h-8" />
                            <span className="text-lg font-medium">
                                Astra
                            </span>
                        </Link>
                    </div>
                    <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <ul className="flex items-center justify-center gap-8">
                            <Link href="#section-pricing-home" className="hover:text-foreground/80 text-sm">Pricing</Link>
                            <Link href="#" className="hover:text-foreground/80 text-sm">About</Link>
                            <Link href="#section-features-home" className="hover:text-foreground/80 text-sm">Features</Link>
                            <Link href="#" className="hover:text-foreground/80 text-sm">Blog</Link>
                        </ul>
                    </nav>
                    <div className="flex items-center gap-4">
                        {session.status == "authenticated" ? (
                            <UserButton />
                        ) : (
                            <>
                                <Link href="/auth/signin" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Login
                                </Link>
                                <Link href="/auth/signup" className={buttonVariants({ size: "sm", className: "hidden md:flex" })}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </AnimationWrapper>
        </header>
    )
};

export default Navbar