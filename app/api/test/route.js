import {NextResponse as Response} from "next/server";

export const runtime = 'edge'

export async function GET(request, response){
    console.log(request)
    return new Response(JSON.stringify({data:"Server API Call Worked"}))
}
