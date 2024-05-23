import {NextResponse as Response} from "next/dist/server/web/spec-extension/response";
import mongoose from "mongoose";
import Test from "@/models/Test";

function cleanTest(test){
    return(test.test)
}
export async function GET(request, response){
    await mongoose.connect(process.env.MONGODB_URI)
    let tests  = await Test.find();
    console.log(tests)
    let cleanTests = tests.map(test=>{
        return cleanTest(test)
    })
    return new Response(JSON.stringify({data:cleanTests}))
}
export async function POST(request,response){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        let data = (await request.json()).data
        let test  = await Test.create({test:data})
        return new Response(JSON.stringify({data:test}))
    }catch(e){
        console.error(e)
        return e
    }
}