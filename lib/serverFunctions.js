'use server'
import fs  from 'fs';

export const runtime = 'edge'
export async function TestFunction(){
    return {data:"Server Side Function Worked"}
}
export async function ReadFile(){
    try{
        let text = fs.readFileSync("test.txt","utf8")
        console.log(text)
        return text

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