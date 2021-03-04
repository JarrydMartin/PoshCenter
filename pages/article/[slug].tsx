import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../../components/Layout'

const ArtcileHomePage = () => {
    const router = useRouter()
    const slug  = router.query["slug"] as string
    return (
        <Layout>
            <p>Page for {slug}</p>
        </Layout>
    )
}

export default ArtcileHomePage
