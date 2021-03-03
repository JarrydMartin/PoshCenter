import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firestore } from '../../lib/firebase';
import { getHeapCodeStatistics } from 'v8';


const Profile = () => {
    const router = useRouter();
    const uid = router.query['uid'] as string;
    const [articles, setArticles] = useState<any[]>([]);

    async function  getUserArticles() {
        const articleSnapShot = await firestore.collection('users').doc(uid).collection('articles').get();
        articleSnapShot.forEach(doc => {setArticles(articles.concat(doc.data()))});
    }

    useEffect(() => {
        
        getUserArticles()
        
    }, [])


    return (
        <div>
            <p>{articles[0].Title}</p>
            <pre>
                {JSON.stringify(articles, null, 2)}
            </pre>
            
        </div>
    )
}

export default Profile
