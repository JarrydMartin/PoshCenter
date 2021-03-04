import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { auth } from "../../../../lib/firebase";
import { ArticleModel } from "../../../../lib/models";
import { GetArticle, UpdateArticle } from "../../../../lib/dataAccess";
import EditNavBar from "../../../../components/EditNavBar";
import EditSideBar from "../../../../components/EditSideBar";
import { ARTICLE_MODE } from "../../../../lib/enums";

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
  const [articleMode, setArticleMode] = useState(ARTICLE_MODE.read);

  useEffect(() => {
    if ((articleMode == ARTICLE_MODE.read) && auth.currentUser) {
      UpdateArticle(auth.currentUser.uid, slug, article);
    }
  }, [articleMode]);

  return (
    <Layout
      asideComponent={<EditSideBar 
          articleMode={articleMode}
          setArticleMode={setArticleMode}/>}
      navComponent={
        <EditNavBar
          articleMode={articleMode}
          setArticleMode={setArticleMode}
          article={article}
          setArticle={setArticle}
          editorRef={editorInstance}
        />
      }
    >
      <Editor
        data={article}
        editorInstance={editorInstance}
        isReadOnly={articleMode== ARTICLE_MODE.read}
      />
    </Layout>
  );
};

export default Article;
