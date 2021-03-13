import React, { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Layout } from "../components/Layout";
import { GetArticleType, UpdateArticleType } from "../lib/dataAccess";
import { ArticleMode, UserRoles } from "../lib/enums";
import { UserContext } from "../lib/contexts";

import dynamic from "next/dynamic";
import { ArticleModel, ArticleType } from "../lib/models";
import NavBar from "../components/NavBar";
import EditSaveButton from "../components/EditSaveButton";
import AuthCheck from "../components/AuthCheck";

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

    const handleOnSave = async () => {
        const editorData = await editorInstance.current.save();
        const newHomePage: ArticleType = { ...homePage, ...editorData };

        setHomePage(newHomePage);
        UpdateArticleType(newHomePage);
        setArticleMode(ArticleMode.READ);
    };

    useEffect(() => {
        getPublishedTypedArticles();
    }, []);

    return (
        <Layout
            navComponent={
                <NavBar>
                    <AuthCheck roleAccess={[UserRoles.ADMIN]} >
                        <EditSaveButton
                            name={"Home Page"}
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
                />
            )}
        </Layout>
    );
}
export default Home;
