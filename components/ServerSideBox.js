'use client'
import {ReadFile, ServerUpload, TestFunction} from "@/lib/serverFunctions";
import {useEffect, useRef, useState} from "react";

export default function ServerSideBox(){
    const [output, setOutput] = useState()
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
    return(
        <div className={'flex justify-evenly flex-col md:flex-row w-fit m-auto text-center'}>
            <button type={"button"} onClick={serverSideFunction} >Server Side Function</button>
            <button type={"button"} onClick={serverSideApi} >Server API Call</button>
            <button type={"button"} onClick={readFile} >Server Function Read File from root.</button>
            {/*<button type={"button"} onClick={readFileFromServer} >Server API Read File from root.</button>*/}
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

        </div>
    )
}