import React, {useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import CreateArticleForm from "../../components/CreateArticleForm";
import { Layout } from "../../components/Layout";
import { ArticleFormModel, ArticleModel } from "../../lib/models";
import { Button, makeStyles } from "@material-ui/core";
import { auth } from "../../lib/firebase";
import kebabCase from 'lodash.kebabcase';
import { useRouter } from 'next/router'
import { AddArticle } from "../../lib/dataAccess";
import AuthCheck from "../../components/AuthCheck";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

function Home() {
  let editorInstance = useRef<EditorJS>(null);
  const [fields, setFields] = useState<ArticleFormModel>({ title: "" });
  const router = useRouter()

  const createArticle = async (e) => {
    e.preventDefault();

    const slug = encodeURI(kebabCase(fields.title));
    const editorData = await editorInstance.current.save();

    const data:ArticleModel = {
      ...editorData,
      ...fields,
      slug: slug,
      authorId: auth.currentUser.uid,
      published: false,
      articleTypeSlug: "none",
      heroDescription: "",
      heroImg: ""
    }
    
    await AddArticle(auth.currentUser.uid, slug, data);

    router.push(`/user/${auth.currentUser.uid}/article/${slug}`);//eg.history.push('/login');
  };

  return (
    <Layout>
      <AuthCheck>
        <CreateArticleForm fields={fields} setFields={setFields} />
        
          <Button type="submit" onClick={createArticle}>
            Create
          </Button>
    
        <Editor editorInstance={editorInstance} data={null}/>
      </AuthCheck>
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
