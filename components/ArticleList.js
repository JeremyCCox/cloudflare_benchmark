import {getData} from "@/lib/serverFunctions";

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
