import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ArticleCard from '../../../components/ArticleCard';
import { Layout } from '../../../components/Layout';
import { GetUserArticles } from '../../../lib/dataAccess';
import { makeStyles } from '@material-ui/core';
import AuthCheck from '../../../components/AuthCheck';
import { UserContext } from '../../../lib/contexts';
import { auth } from '../../../lib/firebase';


const UserIndex = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState(null);
    const router = useRouter()
    const user = useContext(UserContext)
    const uid  = router.query["uid"] as string
    auth.currentUser

    const getArticles = async () => {
        if(user){
            const userArticles = await GetUserArticles(user.uid)
            setArticles(userArticles.map(a => <ArticleCard key={a.slug} article={a}/>))
        }
    }

    useEffect(() => {
        getArticles();
    }, [user])
    
    return (
        <Layout>
            <AuthCheck>
                <div className={classes.root}>
                    {articles}
                </div>
            </AuthCheck>
        </Layout>
    )
}

const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap"
    },
  });

export default UserIndex
