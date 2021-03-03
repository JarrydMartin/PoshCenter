import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { auth, firestore } from "../../../../lib/firebase";
import { UserContext } from "../../../../lib/contexts";
import { ArticleModel } from "../../../../lib/models";
import { GetArticle, UpdateArticle } from "../../../../lib/dataAccess";


const Editor = dynamic(() => import("../../../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

export async function getServerSideProps({ query }) {
  const { uid, slug } = query;

  const articleJson = await GetArticle(uid, slug);
  return {
    props: { articleJson, uid, slug },
  };
}

const Article = ({ articleJson, uid, slug }) => {
  let editorInstance = useRef<EditorJS>(null);
  const [article, setArticle] = useState<ArticleModel>(articleJson);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!editMode) {
      console.log("UPDATE");
      UpdateArticle(auth.currentUser.uid, slug, article);
    }
  }, [editMode]);

  return (
    <Layout
      editMode={editMode}
      setEditMode={setEditMode}
      article={article}
      setArticle={setArticle}
      editorRef={editorInstance}
    >
      <Editor
        data={article}
        editorInstance={editorInstance}
        isReadOnly={!editMode}
      />
    </Layout>
  );
};

export default Article;
