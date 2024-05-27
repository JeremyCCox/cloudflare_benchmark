import {getEnvVal} from "@/app/api/database/route";

export default async function ArticleList({category}) {
    let posts = await getData(category)

    return (
        <>
            {Object.values(posts).map((post,index)=>{
                return(
                    <p key={index}>
                        {post.title} |
                        {post.category}
                    </p>
                )
            })}
        </>
    )
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