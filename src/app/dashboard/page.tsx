'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextGenerationResponse } from "@/models/TextGenerationResponse";
import SummarySegment from "@/components/ui/summary-segment";
import { userData } from "@/models/UserData";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import logger from "@/lib/logging";

const Dashboard = () => {
    const [data, setData] = useState<TextGenerationResponse|null>(null);
    const [image, setImage] = useState<string|null>(null);
    const [segments, setSegments] = useState<string[]|null>(null);
    const [user, setUser] = useState<userData| null>(null);
    const session = useSession();
    const router = useRouter();

    if(!session){
      router.replace("/auth/signin");
    }

    useEffect(() => {
        parseSummary();
    }, [segments]);
      
    const fetchSummaryImage = async () => {
        const response = await fetch('/api/image', {
          method: 'GET',
        });
      
        if (response.ok) {
          const result = await response.json();
          setImage(result.data[0].b64_json);
        } else {
          console.error('FETCH IMAGE FAILED');
        }
    };
      
      const fetchSummary = async () => {
        const response = await fetch('/api/text', {
          method: 'GET',
        });
      
        if (response.ok) {
          const data: TextGenerationResponse = await response.json();
          setData(data);
        } else {
          console.error('FETCH SUMMARY FAILED');
        }
    };
      
    const generateAndFetchUser = async () => {
      const newUserData: userData = {
        email: "ankitdas@gmail.com",
        provider: "google",
        providerId: "google-provider-id",
        username: "ankit",
        profile: {
            name: "Ankit Das",
            avatar: "",
        }
      }
    
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: newUserData }),
      });
    
      if (response.ok) {
        const data: userData = await response.json();
        setUser(data);
      } else {
        console.error('FETCH USER FAILED');
      }
    }
    
    const parseSummary = () => {
      if(data != null){
        const segmentString: string = data.choices[0].message.content;
        const splitSegments = segmentString.split(/\d+\.\s/).filter(line => line.trim() !== "");
        setSegments(splitSegments);
      }
    }
    
    return (
      <main className="m-4 flex-col items-center justify-center text-center">
        <h1 className="text-center">API Response</h1>
        <div className="z-10 w-auto h-auto items-center justify-center text-center font-mono text-sm p-2 pt-4 border rounded-lg border-gray-700">
          <div className="flex max-w-[1024] text-center items-center justify-center border border-rounded border-gray-500 mb-2">
            {image ? (
              <img src={`data:image/png;base64, ${image}`}></img>
            ) : (
              <p>No Picture Yet</p>
            )}
          </div>
          <div className="flex max-w-[1024] text-center items-center justify-center">
            {segments ? (
              <p>{segments.map((segment, i) => {
                  return <SummarySegment segment={segment} i={i}/>
              })}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="flex max-w-[1024] text-center items-center justify-center">
            {user ? (
              <p>{user.username}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2 space-x-2">
            <Button onClick={fetchSummaryImage}>Get Banner</Button>
            <Button onClick={fetchSummary}>Get Summary</Button>
            <Button onClick={generateAndFetchUser}>Create Test User</Button>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      </main>
    );
}

export default Dashboard;
