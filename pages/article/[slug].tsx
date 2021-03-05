import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ArticleCard from '../../components/ArticleCard'
import { Layout } from '../../components/Layout'
import { GetPublishedArticlesByType } from '../../lib/dataAccess'

const ArtcileHomePage = () => {
    const router = useRouter()
    const [articles, setArticles] = useState(null);
    const slug  = router.query["slug"] as string

    async function getPublishedTypedArticles(){
        const articles = await GetPublishedArticlesByType(slug)
        setArticles(articles.map(a => <ArticleCard key={a.slug} article={a}/>))
    }

    useEffect(() => {
        getPublishedTypedArticles()
    }, [router])
    return (
        <Layout>
            {articles}
        </Layout>
    )
}

export default ArtcileHomePage
