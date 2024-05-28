'use server'
import fs  from 'fs';
import {getEnvVal} from "@/app/api/database/route";

export async function TestFunction(){
    return {data:"Server Side Function Worked"}
}
export async function ReadFile(){
    try{
        let text = fs.readFileSync("test.txt","utf8")
        console.log(text)
        return text+" read by server function call"

    }catch(err){
        console.error(err)
        return("File could not be accessed")
    }
}
export async function ServerUpload(formData){
   try{
       let fileData = (formData.get('file'));
       return({size:fileData.size+" Bytes",name:fileData.name.split(".")[0],type:fileData.type})
   }catch(e){
       console.log(e)
       return({error:"Could not read file!"})
   }
}


export async function getData(category){
    let [uri, apiKey] = getEnvVal(["MONGODB_URI", "MONGODB_DATA_API_KEY"])
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
            "filter":{
                "category":{
                    "$eq":category
                }
            }
        })
    })
    let posts  = (await res.json()).documents
    return Object.values(posts).map(post=>{
        return({title:post.test,category:post.category})
    })
}