import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firestore } from '../../../lib/firebase';
import { ArticleFormModel, ArticleModel } from '../../../lib/models';
import ArticleCard from '../../../components/ArticleCard';
import { Layout } from '../../../components/Layout';

export async function getServerSideProps({query}) {
    const {uid} = query;
    const articlesSnapShot = await firestore.collection('users').doc(uid).collection('articles').get();
    const articlesJson = articlesSnapShot.docs.map(doc => JSON.stringify(doc.data(),null, 2));
    return{
        props:{articlesJson}
    }
    
}

const UserIndex = ({articlesJson}) => {

    const articles:ArticleModel[] = articlesJson.map(a => JSON.parse(a))
    const articleList = articles.map(a => <li style={{listStyleType: "none"}} ><ArticleCard article={a}/></li>)
    
    return (
        <Layout>
            <ul>
                {articleList}
            </ul>
        </Layout>
    )
}

export default UserIndex
