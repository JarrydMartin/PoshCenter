import React, { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Layout } from "../components/Layout";
import { GetArticleType, UpdateArticleType } from "../lib/dataAccess";
import { ArticleMode, UserRoles } from "../lib/enums";
import { UserContext } from "../lib/contexts";

import ArticleCardList from "../components/ArticleCardList";
import NavBarAsEditor from "../components/EditNavBar";
import dynamic from "next/dynamic";
import { ArticleModel } from "../lib/models";

const Editor = dynamic(() => import("../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

function Home() {
    const [homePage, setHomePage] = useState(null);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);
    const { user } = useContext(UserContext);
    let editorInstance = useRef<EditorJS>(null);

    async function getPublishedTypedArticles() {
        const homePage = await GetArticleType("home");
        setHomePage(homePage);
    }

    useEffect(() => {
        getPublishedTypedArticles();
    }, []);

    useEffect(() => {
        if (articleMode == ArticleMode.READ && user.role == UserRoles.ADMIN) {
            UpdateArticleType(homePage);
        }
    }, [articleMode]);
    return (
        <>
            {user.role == UserRoles.ADMIN ? (
                <Layout
                    navComponent={
                        <NavBarAsEditor
                            editorRef={editorInstance}
                            articleMode={articleMode}
                            setArticleMode={setArticleMode}
                            article={homePage}
                            setArticle={setHomePage}
                        />
                    }>
                    {homePage && (
                        <Editor
                            data={homePage}
                            editorInstance={editorInstance}
                            isReadOnly={articleMode == ArticleMode.READ}
                            reInitialize={true}
                        />
                    )}
                </Layout>
            ) : (
                <Layout>
                    {homePage && <Editor data={homePage} isReadOnly={true} />}
                </Layout>
            )}
        </>
    );
}
export default Home;
