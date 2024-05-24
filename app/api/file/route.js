import {NextResponse as Response} from "next/server";
// import fs from "fs";
export const runtime = 'edge'
export async function POST(request,response){
    try{
        let data = (await request.formData()).get('file')
        let fileData = {size:data.size+" Bytes",name:data.name.split(".")[0],type:data.type};
        console.log(fileData)

        return new Response(JSON.stringify(fileData))
        // return new Response(JSON.stringify({error:true}))
    }catch(e){
        console.log(e)
        return new Response(JSON.stringify({error:"Could not read uploaded file!"}))
    }
}
// export async function GET(request,response){
//     try{
//         // let text = fs.readFileSync("test.txt","utf8")
//         console.log(text)
//
//         return new Response(JSON.stringify({data:text+" read by API call"}))
//     }catch(e){
//         console.log(e)
//         return new Response(JSON.stringify({error:"Could not read file on server!"}))
//     }
// }
