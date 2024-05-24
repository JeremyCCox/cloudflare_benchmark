import {NextResponse as Response} from "next/dist/server/web/spec-extension/response";
import { getRequestContext } from '@cloudflare/next-on-pages'

// import mongoose from "mongoose";
// import Test from "@/models/Test";
// import {revalidatePath} from "next/cache";

export const runtime = 'edge'
function cleanTest(test){
    return(test.test)
}


export async function GET(request, response){
    try{

        const myKv = getRequestContext().env.MY_KV
        // console.log(myKv)
        let uri = await myKv.get('MONGODB_URI')
        // console.log(uri)
        let apiKey = await myKv.get('MONGODB_DATA_API_KEY')
        // console.log(apiKey)

        let res = await fetch(uri+"/action/find",{
            method:'POST',
            headers:{
                'apiKey':apiKey,
                'Content-Type':"application/json",
                'Accept':'application/json',
            },
            body:JSON.stringify({
                "dataSource": "mongodb-atlas",
                "database": "cloudflare",
                "collection":"tests",
                "filter":{}
            })
        })
        let tests  = (await res.json()).documents
        let cleanTests = tests.map(test => {
            return cleanTest(test)
        })

        return new Response(
            JSON.stringify(
                {
                    data:["val"]
                    // data: cleanTests
                }
            )
        )
    }catch (e) {
        console.error(e);
        return errorResponse("Could not GET data from database")
    }
}
export async function POST(request,response){
    try{
        let json = await request.json()
        console.log(json)
        let value = json.data
        console.log(value)
        let res = await fetch(process.env.MONGODB_URI+"/action/insertOne",{
            method:'POST',
            headers:{
                'apiKey':process.env.MONGODB_DATA_API_KEY,
                'Content-Type':"application/json",
                'Accept':'application/json',
            },
            body:JSON.stringify({
                "dataSource": "mongodb-atlas",
                "database": "cloudflare",
                "collection":"tests",
                "document":{
                    "test":value
                }
            })
        })
        return new Response(JSON.stringify({data:`"${value}" was added to the database!`}))
    }catch(e){
        console.error(e)
        return errorResponse("Could not POST data to database")
    }
}

const errorResponse = (error)=>{
    return new Response(JSON.stringify({error:true, data:error}))
}