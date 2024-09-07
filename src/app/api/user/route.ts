import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createUser } from "@/controllers/users";
import { userData } from '@/models/UserData';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    // Validate user input
    if (!user) {
      return NextResponse.json(
        { message: 'User is Required!' },
        { status: 400 }
      );
    }

    const data = await createUser(user as userData);
    if(data == null){
        return NextResponse.json({message:"User Not Found!"} ,{status: 404, statusText: "NOT_FOUND"});    
    }
    return NextResponse.json(data, {status: 200, statusText: "SUCCESS"});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'An Error Occurred' }, { status: 500, statusText: "FAILED" });
  }
}
