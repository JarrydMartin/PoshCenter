import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firestore } from '../../../lib/firebase';
import { ArticleFormModel, ArticleModel } from '../../../lib/models';
import ArticleCard from '../../../components/ArticleCard';
import { Layout } from '../../../components/Layout';
import { GetUserArticles } from '../../../lib/dataAccess';
import { makeStyles } from '@material-ui/core';

export async function getServerSideProps({query}) {
    const {uid} = query;
    const articles = await GetUserArticles(uid)
    return{
        props:{articles}
    }
    
}

const UserIndex = ({articles}:{articles:ArticleModel[]}) => {
    const classes = useStyles();
    const articleList = articles.map(a => <ArticleCard article={a}/>)
    
    return (
        <Layout>
            <div className={classes.root}>
            
                {articleList}
                </div>
            
        </Layout>
    )
}

const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
  });

export default UserIndex
