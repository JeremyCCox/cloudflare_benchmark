import ServerSideBox from "@/components/ServerSideBox";

export default async function Home() {

    return (
        <main className="">
            <ServerSideBox/>
            {/*<Suspense fallback={<></>}>*/}
            {/*    <ServerSideBox data={await getData()}/>*/}
            {/*</Suspense>*/}
        </main>
    );
}
//
// async function getData(){
//     await mongoose.connect(process.env.MONGODB_URI)
//     let tests  = await Test.find();
//     console.log(tests)
//     return tests.map(test=>{
//         return cleanTest(test)
//     })
// }
// function cleanTest(test){
//     return(test.test)
// }
