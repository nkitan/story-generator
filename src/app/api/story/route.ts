import { addInput } from "@/controllers/stories";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/api/auth/[...nextauth]"
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export default async function POST(req: any | NextApiRequest | (IncomingMessage & { cookies: NextApiRequestCookies; }), res: any | ServerResponse<IncomingMessage> | NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        try {
            const { input } = await req.json();
            const data = await addInput(userId , input);
            if(data.message){
                return NextResponse.json({message: "Successfully Created Story Draft"}, { status: 200, statusText: "SUCCESS" });
            }
        } catch (err: any) {
            return NextResponse.json({message: "Failed To Create Story Draft"}, { status: 500, statusText: "ERRORED" });
        }

    } else {
      res.send({
        error: "You must be signed in to view the protected content on this page.",
      })
    }
  
}