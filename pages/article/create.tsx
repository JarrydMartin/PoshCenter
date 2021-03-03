import React, { useContext, useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import CreateArticleForm from "../../components/CreateArticleForm";
import { Layout } from "../../components/Layout";
import { ArticleFormModel, ArticleModel } from "../../lib/models";
import { Button, makeStyles } from "@material-ui/core";
import { auth, firestore } from "../../lib/firebase";
import kebabCase from 'lodash.kebabcase';
import { UserContext } from "../../lib/contexts";
import Link from "next/link";
import { useRouter } from 'next/router'

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

function Home() {
  const { user } = useContext(UserContext);
  let editorInstance = useRef<EditorJS>(null);
  let formRef = useRef(null);
  const [fields, setFields] = useState<ArticleFormModel>({ title: "" });
  const router = useRouter()

  const createArticle = async (e) => {
    e.preventDefault();

    const slug = encodeURI(kebabCase(fields.title));
    const editorData = await editorInstance.current.save();
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('articles').doc(slug);
    
    const data:ArticleModel = {
      ...editorData,
      ...fields,
      slug: slug,
      authorUri: auth.currentUser.uid
    }
    await ref.set(data);
    router.push(`/user/${auth.currentUser.uid}/article/${slug}`);//eg.history.push('/login');
  };

  return (
    <Layout>
      <CreateArticleForm fields={fields} setFields={setFields} />
      
      <Button type="submit" onClick={createArticle}>
        Create
      </Button>
  
      <Editor editorInstance={editorInstance} data={null}/>
    </Layout>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > *": {
      margin: "4px",
    },
    "& > p": {
      fontSize: "18px",
    },
  },
});
export default Home;
