import { Button } from '@material-ui/core'
import React from 'react'
import AuthButton from '../components/AuthButton'
import AuthCheck from '../components/AuthCheck'
import { Layout } from '../components/Layout'
import { auth } from '../lib/firebase'
import { useUser } from '../lib/hooks'

const profile = () => {
    const {user} =  useUser();

    return (
        <Layout>
            
            <div className="box-center">
                <img width={200} height={200} src={user?.profileImage || '/hacker.png'} className="card-img-center" />
                <h1>{user?.name || 'Anonymous User'}</h1>
                <h2>{user?.role}</h2>
                <AuthButton />
            </div>
        </Layout>
    )
}

export default profile
