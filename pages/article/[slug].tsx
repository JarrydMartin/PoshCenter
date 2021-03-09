import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import ArticleCardList from "../../components/ArticleCardList";

import { Layout } from "../../components/Layout";
import {
    DeleteUserArticle,
    GetArticleType,
    GetPublishedArticlesByType,
    UpdateArticleType,
} from "../../lib/dataAccess";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core";
import NavBarAsEditor from "../../components/EditNavBar";
import { ArticleMode, UserRoles } from "../../lib/enums";
import { UserContext } from "../../lib/contexts";
import { ArticleType } from "../../lib/models";

const Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

const ArtcileHomePage = () => {
    const router = useRouter();
    const slug = router.query["slug"] as string;
    const [articles, setArticles] = useState(null);
    const [homePage, setHomePage] = useState(null);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);
    const { user } = useContext(UserContext);
    let editorInstance = useRef<EditorJS>(null);
    const CanEdit = articleMode == ArticleMode.READ && user.role == UserRoles.ADMIN;

    async function getPublishedTypedArticles() {
        const homePage = await GetArticleType(slug);
        setHomePage(homePage);
        const articles = await GetPublishedArticlesByType(slug);
        setArticles(articles);
    }
    
    useEffect(() => {
        getPublishedTypedArticles();
    }, [router]);

    const HandleSave = async () => {
        // UpdateArticleType(homePage);
        // router.reload();
        const editorData = await editorInstance.current.save();
        const newHomePage:ArticleType = { ...homePage, ...editorData }
        setHomePage(newHomePage);
        UpdateArticleType(newHomePage);
    }
  
    return (
                <Layout
                    navComponent={
                        <NavBarAsEditor
                            editorRef={editorInstance}
                            articleMode={articleMode}
                            setArticleMode={setArticleMode}
                            article={homePage}
                            setArticle={setHomePage}
                            onSave={HandleSave}
                        />
                    }>
                    {homePage && (
                        <Editor
                            data={homePage}
                            editorInstance={editorInstance}
                            isReadOnly={CanEdit}
                            holder={slug}
                            enableReInitialize={articleMode == ArticleMode.READ}
                        />
                    )}
                    {articles && <ArticleCardList articles={articles} />}
                </Layout>
    );
};

export default ArtcileHomePage;
