import Image from "next/image";
import ServerSideBox from "@/components/ServerSideBox";
import mongoose from "mongoose";
import Test from "@/models/Test";
import {Suspense} from "react";

export default async function Home() {

    return (
        <main className="">
            <Suspense fallback={<></>}>
                <ServerSideBox data={await getData()}/>
            </Suspense>
        </main>
    );
}

async function getData(){
    await mongoose.connect(process.env.MONGODB_URI)
    let tests  = await Test.find();
    console.log(tests)
    return tests.map(test=>{
        return cleanTest(test)
    })
}
function cleanTest(test){
    return(test.test)
}
