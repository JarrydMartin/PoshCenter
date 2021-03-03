import dynamic from 'next/dynamic';
import React, { useContext, useState } from 'react'
import { Layout } from '../../../../components/Layout'
import { firestore } from '../../../../lib/firebase';
import { UserContext } from "../../../../lib/contexts";

const Editor = dynamic(() => import("../../../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
  });

export async function getServerSideProps({query}) {
    const {uid, slug} = query
    const articleSnapShot = await firestore.collection('users').doc(uid)
                                            .collection('articles').doc(slug).get();
    const articleJson = articleSnapShot.data();
    return{
        props:{articleJson,uid}
    }
}

const Article = ({articleJson}) => {
    const [editMode, setEditMode] = useState(false)
    return (
        <Layout editMode={editMode} setEditMode={setEditMode}>
            <Editor data={articleJson} isReadOnly={!editMode}/>
        </Layout>
    )
}

export default Article
