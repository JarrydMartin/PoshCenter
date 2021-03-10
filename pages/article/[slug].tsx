import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import ArticleCardList from "../../components/ArticleCardList";

import { Layout } from "../../components/Layout";
import {
    GetArticleType,
    GetPublishedArticlesByType,
    UpdateArticleType,
} from "../../lib/dataAccess";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { ArticleMode, UserRoles } from "../../lib/enums";
import { UserContext } from "../../lib/contexts";
import { ArticleType } from "../../lib/models";
import NavBar from "../../components/NavBar";
import AuthCheck from "../../components/AuthCheck";
import EditSaveButton from "../../components/EditSaveButton";

const Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

const ArtcileHomePage = () => {
    const router = useRouter();
    const slug = router.query["slug"] as string;
    const [articles, setArticles] = useState(null);
    const defaultHome: ArticleType = {
        name: "home",
        blocks: [{ data: { text: "..." }, type: "paragraph" }],
        order: 0,
        slug: "home1",
        time: 0,
    };
    const [homePage, setHomePage] = useState<ArticleType>(defaultHome);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);
    const { user } = useContext(UserContext);
    let editorInstance = useRef<EditorJS>(null);
   
    async function getPublishedTypedArticles() {
        const homePage = await GetArticleType(slug);
        setHomePage(homePage);

        const articles = await GetPublishedArticlesByType(slug);
        setArticles(articles);
    }

    useEffect(() => {
        setHomePage(null);
        setArticles(null);
        getPublishedTypedArticles();
        console.log("hello");
    }, [router]);

    const handleOnSave = async () => {
        const editorData = await editorInstance.current.save();
        const newHomePage: ArticleType = { ...homePage, ...editorData };
        setHomePage(newHomePage);
        UpdateArticleType(newHomePage);
    };

    return (
        <Layout
            navComponent={
                <NavBar>
                    <AuthCheck roleAccess={UserRoles.ADMIN}>
                        <EditSaveButton
                            name={"Page"}
                            onSave={handleOnSave}
                            onEdit={() => setArticleMode(ArticleMode.EDIT)}
                        />
                    </AuthCheck>
                </NavBar>
            }>
            {homePage && (
                <Editor
                    data={homePage}
                    editorInstance={editorInstance}
                    isReadOnly={articleMode == ArticleMode.READ}
                    holder={slug}
                />
            )}

            {articles && <ArticleCardList articles={articles} />}
        </Layout>
    );
};

export default ArtcileHomePage;
