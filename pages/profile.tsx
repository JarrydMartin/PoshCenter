import React, { useEffect, useState } from 'react'
import ArticleCardList from '../components/ArticleCardList'
import AuthButton from '../components/AuthButton'
import { Layout } from '../components/Layout'
import { GetUserArticles } from '../lib/dataAccess'
import { useUser } from '../lib/hooks'
import { ArticleModel } from '../lib/models'

const profile = () => {
    const {user, isSignedIn, canEdit} =  useUser();
    const [articles, setArticles] = useState<ArticleModel[]>(null); 

    const getArticles = async () => {
        if(user){
            const userArticles = await GetUserArticles(user.uid);
            setArticles(userArticles);
        }
    }

    useEffect(() => {
        getArticles();
    }, [user])
    
    return (
        <Layout user={user} canEdit={canEdit} isSignedIn={isSignedIn}>
            <div className="box-center">
                <img width={200} height={200} src={user?.profileImage} className="card-img-center" />
                <h1>{user?.name || 'Anonymous User'}</h1>
                <h2>{user?.role}</h2>
                <AuthButton isSignedIn={isSignedIn} />
                {articles && <ArticleCardList articles={articles} />}
            </div>
        </Layout>
    )
}

export default profile
