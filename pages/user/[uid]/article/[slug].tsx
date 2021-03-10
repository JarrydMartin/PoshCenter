import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { ArticleModel } from "../../../../lib/models";
import {
    DeleteUserArticle,
    GetArticle,
    UpdateArticle,
} from "../../../../lib/dataAccess";
import { ArticleMode, UserRoles } from "../../../../lib/enums";
import SideBar from "../../../../components/SideBar";
import { useRouter } from "next/router";
import { UserContext } from "../../../../lib/contexts";
import { Button } from "@material-ui/core";
import NavBar from "../../../../components/NavBar";
import AuthCheck from "../../../../components/AuthCheck";
import EditSaveButton from "../../../../components/EditSaveButton";

const Editor = dynamic(() => import("../../../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

export async function getServerSideProps({ query }) {
    const { uid, slug } = query;
    const articleJson = await GetArticle(uid, slug);
    return {
        props: { articleJson },
    };
}

const Article = ({ articleJson }) => {
    const router = useRouter();
    // const pageuid = router.query["uid"] as string;

    let editorInstance = useRef<EditorJS>(null);

    const { user } = useContext(UserContext);

    const [article, setArticle] = useState<ArticleModel>(articleJson);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);

    const deleteArticle = async () => {
        await DeleteUserArticle(user.uid, article.articleId);
        router.push("/profile");
    };

    const handleOnSave = async () => {
        const editorData = await editorInstance.current.save();
        const newHomePage: ArticleModel = { ...article, ...editorData };

        setArticle(newHomePage);
        UpdateArticle(newHomePage);
        setArticleMode(ArticleMode.READ);
    };

    return (
        <Layout
            asideComponent={
                <>
                    <SideBar
                        article={article}
                        setArticle={setArticle}
                        articleMode={articleMode}
                        setArticleMode={setArticleMode}
                    />
                    {articleMode != ArticleMode.READ && (
                        <Button onClick={deleteArticle}>Delete</Button>
                    )}
                </>
            }
            navComponent={
                <NavBar>
                    <AuthCheck roleAccess={UserRoles.EDITOR}>
                        <EditSaveButton
                            name={"Article"}
                            onSave={handleOnSave}
                            onEdit={() => setArticleMode(ArticleMode.EDIT)}
                        />
                    </AuthCheck>
                </NavBar>
            }>
            <Editor
                data={article}
                editorInstance={editorInstance}
                isReadOnly={articleMode == ArticleMode.READ}
            />
        </Layout>
    );
};

export default Article;
