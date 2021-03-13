import { useRouter } from "next/router";
import React, {useEffect, useRef, useState } from "react";
import ArticleCardList from "../components/ArticleCardList";
import { Layout } from "../components/Layout";
import {
    GetArticleType,
    GetPublishedArticlesByType,
    UpdateArticleType,
} from "../lib/dataAccess";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { ArticleMode, UserRoles } from "../lib/enums";
import { ArticleType } from "../lib/models";
import NavBar from "../components/NavBar";
import AuthCheck from "../components/AuthCheck";
import EditSaveButton from "../components/EditSaveButton";

const Editor = dynamic(() => import("../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

const ArtcilePage = () => {
    const router = useRouter();
    const slug = router.query["slug"] as string;

    const [articles, setArticles] = useState(null);
    const [page, setPage] = useState<ArticleType>(null);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);

    let editorInstance = useRef<EditorJS>(null);
   
    async function getPublishedTypedArticles() {
        const page = await GetArticleType(slug);
        setPage(page);

        const articles = await GetPublishedArticlesByType(slug);
        setArticles(articles);
    }

    useEffect(() => {
        setPage(null);
        setArticles(null);
        getPublishedTypedArticles();
    }, [router]);

    const handleOnSave = async () => {
        const editorData = await editorInstance.current.save();
        const newPage: ArticleType = { ...page, ...editorData };
        setPage(newPage);
        UpdateArticleType(newPage);
    };

    return (
        <Layout
            navComponent={
                <NavBar>
                    <AuthCheck roleAccess={[UserRoles.ADMIN]}>
                        <EditSaveButton
                            name={"Page"}
                            onSave={handleOnSave}
                            onEdit={() => setArticleMode(ArticleMode.EDIT)}
                        />
                    </AuthCheck>
                </NavBar>
            }>
            {page && (
                <Editor
                    data={page}
                    editorInstance={editorInstance}
                    isReadOnly={articleMode == ArticleMode.READ}
                    holder={slug}
                />
            )}

            {articles && <ArticleCardList articles={articles} />}
        </Layout>
    );
};

export default ArtcilePage;
