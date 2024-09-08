"use client";

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleIcon from "@/components/icons/google-icon"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LoginImage from "@/public/login-image-1.jpg"
import GithubIcon from "@/components/icons/github-icon"
import DarkModeToggle from "@/components/ui/dark-mode-toggle"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export default function SignInPage() {
  const [carousel,setCarousel] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  if(session && session.status == "authenticated"){
    router.replace("/");
  }

  return (
    <div className="bg-background w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:grid-cols-5 xl:min-h-[800px] max-w-[120%]">
      <div className="hidden bg-transparent lg:block lg:col-span-1 xl:col-span-3">
        <Image
          src={LoginImage}
          alt="Image"
          className="h-screen w-auto object-cover dark:brightness-[0.6]"
        />
      </div>
      <div className="flex w-full items-center justify-center lg:col-span-1 xl:col-span-2 py-12">
          <div className="grid grid-cols-1">
            <div className="col-span-1 mt-10 lg:mb-40">
              <h1 className="text-center text-3xl font-bold">StoryGenerator.in</h1>
              <div className="text-center text-md text-balance text-muted-foreground mt-1">
                  <p>express your imagination</p>
              </div>
            </div>
            <Card className="w-full max-w-sm bg-card/5 mt-28 lg:mt-0 col-span-1">
              <CardHeader>
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <CardDescription className="text-balance text-muted-foreground">
                    to get started
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-center text-xs text-balance text-muted-foreground">
                  <p>you can use</p>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full bg-background/5 hover:bg-primary/5 hover:scale-[.99]"
                    onClick={() => signIn('google')}
                  >
                    <GoogleIcon className={"mr-2 fill-black-100"}/>
                    Google
                  </Button>
                  <div className="relative bg-transparent">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>  
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 text-muted-foreground">or</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-background/5 hover:bg-primary/5 hover:scale-[.99]"
                    onClick={() => signIn('github')}
                  >
                    <GithubIcon className=""/>
                    GitHub
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="mx-auto grid w-[350px] gap-6">
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className="underline">
                      Sign up
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
      </div>
      { carousel ? 
        (<div className="flex w-auto h-screen lg:hidden">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
              <Image
                src={LoginImage}
                alt="Image"
                className="w-auto object-cover dark:brightness-[0.6]"
              />
              </CarouselItem>
              <CarouselItem className="border border-black">Item2</CarouselItem>
              <CarouselItem>Item3</CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>)
        :
        ""
      }
    </div>
  )
}
