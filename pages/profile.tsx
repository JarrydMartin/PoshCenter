import React, { useContext, useEffect, useState } from 'react'
import ArticleCardList from '../components/ArticleCardList'
import AuthButton from '../components/AuthButton'
import { Layout } from '../components/Layout'
import { UserContext } from '../lib/contexts'
import { GetArticlesByAuthorId } from '../lib/dataAccess'
import { ArticleModel } from '../lib/models'

const profile = () => {
    const {user} =  useContext(UserContext);
    const [articles, setArticles] = useState<ArticleModel[]>(null); 

    const getArticles = async () => {
        if(user){
            const userArticles = await GetArticlesByAuthorId(user.uid);
            setArticles(userArticles);
        }
    }

    useEffect(() => {
        getArticles();
    }, [user])
    
    return (
        <Layout>
            <div className="box-center">
                <img width={200} height={200} src={user.profileImage} className="card-img-center" />
                <h1>{user.name || 'Anonymous User'}</h1>
                <h2>{user.role}</h2>
                <AuthButton />
                {articles && <ArticleCardList articles={articles} />}
            </div>
        </Layout>
    )
}

export default profile
