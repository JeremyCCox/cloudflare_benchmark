import ArticleList from "@/components/ArticleList";
export const runtime = 'edge'
export default function Page({params}){
    return(
        <>
            <ArticleList category={params.category}/>
        </>
    )
}