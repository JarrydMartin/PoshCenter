import React from 'react'
import { Layout } from '../../../../components/Layout'

export async function getServerSideProps({query}) {
    const {uid, slug} = query
    return{
        props:{uid, slug}
    }
}

const Article = ({uid, slug}) => {
    return (
        <Layout>
            <p>{uid} and {slug} </p>
        </Layout>
    )
}

export default Article
