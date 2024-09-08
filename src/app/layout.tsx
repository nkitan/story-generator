
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getSession } from "next-auth/react";
import Providers from "@/app/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryGenerator",
  description: "Generate Videos From Your Stories",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}