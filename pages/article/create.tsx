import React, { useContext, useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import CreateArticleForm from "../../components/CreateArticleForm";
import { Layout } from "../../components/Layout";
import { ArticleFormModel } from "../../lib/models";
import { Button, makeStyles } from "@material-ui/core";
import { auth, firestore } from "../../lib/firebase";
import kebabCase from 'lodash.kebabcase';
import { UserContext } from "../../lib/contexts";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

function Home() {
  const { user } = useContext(UserContext);
  let editorInstance = useRef<EditorJS>(null);
  let formRef = useRef(null);
  const [fields, setFields] = useState<ArticleFormModel>({ Title: "" });

  const createArticle = async (e) => {
    e.preventDefault();

    const slug = encodeURI(kebabCase(fields.Title));
    const editorData = await editorInstance.current.save();
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('articles').doc(slug);
    
    const data = {
      ...editorData,
      ...fields,
      slug: slug,
      AuthorUri: auth.currentUser.uid
    }
    await ref.set(data);
  };

  return (
    <Layout>
      <CreateArticleForm fields={fields} setFields={setFields} />
      <Button type="submit" onClick={createArticle}>
        Create
      </Button>
      <Editor editorInstance={editorInstance} />
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
