import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ArticleCard from '../../components/ArticleCard'
import ArticleCardList from '../../components/ArticleCardList'

import { Layout } from '../../components/Layout'
import { GetArticleType, GetPublishedArticlesByType } from '../../lib/dataAccess'
import EditorJS from "@editorjs/editorjs";
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core'

const Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

const ArtcileHomePage = () => {
    const router = useRouter()
    const slug  = router.query["slug"] as string
    const [articles, setArticles] = useState(null);
    const [homePage, setHomePage] = useState(null);
    
    let editorInstance = useRef<EditorJS>(null);

    async function getPublishedTypedArticles(){
        const homePage = await GetArticleType(slug)
        setHomePage(homePage);
        const articles = await GetPublishedArticlesByType(slug)
        setArticles(articles)
    }

    useEffect(() => {
        getPublishedTypedArticles()
    }, [router])
    return (
        <Layout >
            {homePage && <Editor data={homePage} editorInstance={editorInstance}/> }
            {articles&& <ArticleCardList articles={articles} />}
        </Layout>
    )
}

export default ArtcileHomePage
