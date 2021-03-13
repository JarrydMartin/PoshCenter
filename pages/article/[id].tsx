import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { ArticleModel } from "../../lib/models";
import { DeleteArticle, GetArticle, UpdateArticle } from "../../lib/dataAccess";
import { ArticleMode, UserRoles } from "../../lib/enums";
import SideBar from "../../components/SideBar";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/contexts";
import { Button, makeStyles } from "@material-ui/core";
import NavBar from "../../components/NavBar";
import AuthCheck from "../../components/AuthCheck";
import EditSaveButton from "../../components/EditSaveButton";
import { EDITOR_ROLES } from "../../lib/userConstants";
import HeartButton from "../../components/HeartButton";

const Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

export async function getServerSideProps({ query }) {
    const { id } = query;
    const articleJson = await GetArticle(id);
    return {
        props: { articleJson },
    };
}

const Article = ({ articleJson }) => {
    const router = useRouter();
    const classes = useStyles();
    // const pageuid = router.query["uid"] as string;

    let editorInstance = useRef<EditorJS>(null);

    const { user } = useContext(UserContext);

    const [article, setArticle] = useState<ArticleModel>(articleJson);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);
    const [likes, setLikes] = useState( articleJson.likes.length);

    const deleteArticle = async () => {
        await DeleteArticle(article.articleId);
        router.push("/profile");
    };

    const handleOnSave = async () => {
        const editorData = await editorInstance.current.save();
        const newHomePage: ArticleModel = { ...article, ...editorData };

        setArticle(newHomePage);
        UpdateArticle(newHomePage);
        setArticleMode(ArticleMode.READ);
    };

    const updateLikes = () => {
        setLikes(article.likes.length);
        UpdateArticle(article);
    }

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
                    {article && (
                        <AuthCheck
                            roleAccess={EDITOR_ROLES}
                            userAccess={article.editors.concat(
                                article.authorId
                            )}>
                            <EditSaveButton
                                name={"Article"}
                                onSave={handleOnSave}
                                onEdit={() => setArticleMode(ArticleMode.EDIT)}
                            />
                        </AuthCheck>
                    )}
                </NavBar>
            }>
            <div className={classes.root}>
                <Editor
                    data={article}
                    editorInstance={editorInstance}
                    isReadOnly={articleMode == ArticleMode.READ}
                />
                <HeartButton
                    userLiked={article.likes.includes(user.uid)}
                    likes={likes}
                    onLiked={() => {
                        article.likes.push(user.uid);
                        updateLikes();
                    }}
                    onUnliked={() => {
                        article.likes = article.likes.filter(
                            (like) => like != user.uid
                        );
                        updateLikes();
                    }}
                />
            </div>
        </Layout>
    );
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "flex-start",
        alignContent: "flex-start",
        justifyContent: "center",
    },
});

export default Article;
