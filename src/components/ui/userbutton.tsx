"use client";

import React from 'react'
import Link from 'next/link';
import { Button } from './button';

const UserButton = () => {
  return (
    <Link href={"/dashboard"}>
      <Button className="bg-gray-800 text-white hover:bg-gray-800/60 hover:scale-[103%]">
        Dashboard
      </Button>
    </Link>
  )
}

export default UserButton;