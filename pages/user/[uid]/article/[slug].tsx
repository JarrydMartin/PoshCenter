import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { auth } from "../../../../lib/firebase";
import { ArticleModel } from "../../../../lib/models";
import { GetArticle, UpdateArticle } from "../../../../lib/dataAccess";
import EditNavBar from "../../../../components/EditNavBar";
import EditSideBar from "../../../../components/EditSideBar";

const Editor = dynamic(() => import("../../../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

export async function getServerSideProps({ query }) {
  const { uid, slug } = query;
  console.log(uid);
  const articleJson = await GetArticle(uid, slug);
  return {
    props: { articleJson, slug },
  };
}

const Article = ({ articleJson, slug }) => {
  let editorInstance = useRef<EditorJS>(null);
  const [article, setArticle] = useState<ArticleModel>(articleJson);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!editMode && auth.currentUser) {
      UpdateArticle(auth.currentUser.uid, slug, article);
    }
  }, [editMode]);

  return (
    <Layout
      asideComponent={<EditSideBar />}
      navComponent={
        <EditNavBar
          editMode={editMode}
          setEditMode={setEditMode}
          article={article}
          setArticle={setArticle}
          editorRef={editorInstance}
        />
      }
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
