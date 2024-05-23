'use client'
import {ReadFile, ServerUpload, TestFunction} from "@/lib/serverFunctions";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function ServerSideBox({data}){
    const [output, setOutput] = useState()
    const [databaseContent, setDatabaseContent] = useState(data)
    const [image, setImage] = useState()
    const formRef = useRef()
    useEffect(() => {
        setImage(undefined)
    }, [output]);
    const serverSideFunction=async ()=>{
        setOutput((await TestFunction()).data)
    }
    const readFile=async ()=>{
        setOutput(await ReadFile())
    }
    const serverSideApi=async ()=>{
        let data =
        setOutput((await (await fetch("/api/test")).json()).data)
    }
    const uploadFile= async (e)=>{
        if(e.target.files[0].type.includes("image")){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = (r)=>{
                setImage(fileReader.result)
            }
        }else{
            setImage(undefined)
        }
    }
    const serverUpload = async (e)=>{
        e.preventDefault()
        let formData = new FormData(formRef.current)
        let res = await (
            await fetch("/api/file",{
                method:"POST",
                body:formData
            })
        ).json();
        if(!res.error){
            console.log()
            setOutput(`File "${res.name}" uploaded of size ${res.size}, with file type "${res.type}"`)
        }
    }
    const readFileFromServer = async (e)=>{
        let res = await (
            await fetch("/api/file")
        ).json();
        if(!res.error){
            console.log(res.data)
            setOutput(res.data)
        }
    }
    const getDatabase=async ()=>{
        let data = await fetch("/api/database");
        // console.log(await data.json())
        setDatabaseContent((await data.json()).data)
    }
    const Router = useRouter();
    const postDatabase=async ()=>{
        let data = await fetch("/api/database", {
            method:"POST",
            body:JSON.stringify({data:document.getElementById("postData").value})
        });
        Router.refresh();
        console.log(await data.json())
    }
    return(
        <div className={'flex justify-evenly flex-col w-fit m-auto text-center'}>
            <button type={"button"} onClick={serverSideFunction} >Server Side Function</button>
            <button type={"button"} onClick={serverSideApi} >Server API Call</button>
            <button type={"button"} onClick={readFile} >Server Function Read File from root.</button>
            <input type={"file"} onChange={uploadFile}/>
            <div className={'min-h-32 border-black border '}>
                {image?
                    <img src={image} alt={'uploaded image'}/>
                    :
                    output
                }

            </div>
            <form ref={formRef} onSubmit={serverUpload} name={'form'}>
                <input type={'file'} name={'file'} />
                <button>Upload File to Backend</button>
            </form>
            <div>
                <button type={"button"} onClick={getDatabase} >Get Database.</button>
                <label className={'w-full flex'}>
                    <input className={'grow'} type={"text"} id={'postData'}/>
                    <button type={"button"} onClick={postDatabase} >Post to Database.</button>
                </label>
                {databaseContent?
                    Object.values(databaseContent).map((data,index)=>{
                        return(<p className={'w-full'} key={index}>{data}</p>)
                    }):null
                }
            </div>

        </div>
    )
}