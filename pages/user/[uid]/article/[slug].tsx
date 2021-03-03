import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { auth, firestore } from "../../../../lib/firebase";
import { UserContext } from "../../../../lib/contexts";
import { ArticleModel } from "../../../../lib/models";

const Editor = dynamic(() => import("../../../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

export async function getServerSideProps({ query }) {
  const { uid, slug } = query;

  const articleSnapShot = await firestore
    .collection("users")
    .doc(uid)
    .collection("articles")
    .doc(slug)
    .get();
  const articleJson = articleSnapShot.data();
  return {
    props: { articleJson, uid, slug },
  };
}

const Article = ({ articleJson, uid, slug }) => {
  let editorInstance = useRef<EditorJS>(null);
  const [article, setArticle] = useState<ArticleModel>(articleJson);
  const [editMode, setEditMode] = useState(false);

  const UpdateArticle = async () => {
    await firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("articles")
      .doc(slug)
      .set(article);
  };

  useEffect(() => {
    if (!editMode) {
      console.log("UPDATE");
      UpdateArticle();
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
