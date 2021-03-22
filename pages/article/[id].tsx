import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { ArticleModel } from "../../lib/models";
import {
    DeleteArticle,
    GetArticle,
    UpdateArticle,
    GetLikes,
    AddLike,
    DeleteLike,
} from "../../lib/dataAccess";
import { ArticleMode, UserRoles } from "../../lib/enums";
import SideBar from "../../components/SideBar";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/contexts";
import { Button, makeStyles } from "@material-ui/core";
import NavBar from "../../components/NavBar";
import AuthCheck from "../../components/AuthCheck";
import EditSaveButton from "../../components/EditSaveButton";
import { EDITOR_ROLES, READER_ROLES } from "../../lib/userConstants";
import HeartButton from "../../components/HeartButton";
import { Add } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

    const isBigScreen = useMediaQuery("(min-width:800px)");

    let editorInstance = useRef<EditorJS>(null);

    const { user } = useContext(UserContext);

    const [article, setArticle] = useState<ArticleModel>(articleJson);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);

    const [likes, setLikes] = useState<string[]>(null);
    const [likeCount, setLikeCount] = useState(0);

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

    useEffect(() => {
        const fecthingData = async () => {
            const likeData = await GetLikes(article.articleId);
            setLikes(likeData);
            setLikeCount(likeData.length);
        };
        fecthingData();
    }, []);

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
            {isBigScreen ? (
                <div className={classes.rootLarge}>
                    <Editor
                        data={article}
                        editorInstance={editorInstance}
                        isReadOnly={articleMode == ArticleMode.READ}
                    />
                    {likes && (
                        <HeartButton
                            userLiked={likes.includes(user.uid)}
                            likes={likeCount}
                            onLiked={() => {
                                AddLike(article.articleId, user.uid);
                                setLikeCount(likeCount + 1);
                            }}
                            onUnliked={() => {
                                DeleteLike(article.articleId, user.uid);
                                setLikeCount(likeCount - 1);
                            }}
                            readOnly={user.role == UserRoles.ANON}
                        />
                    )}
                </div>
            ) : (
                <div className={classes.rootSmall}>
                    <Editor
                        data={article}
                        editorInstance={editorInstance}
                        isReadOnly={articleMode == ArticleMode.READ}
                    />
                    {likes && (
                        <HeartButton
                            userLiked={likes.includes(user.uid)}
                            likes={likeCount}
                            onLiked={() => {
                                AddLike(article.articleId, user.uid);
                                setLikeCount(likeCount + 1);
                            }}
                            onUnliked={() => {
                                DeleteLike(article.articleId, user.uid);
                                setLikeCount(likeCount - 1);
                            }}
                            readOnly={user.role == UserRoles.ANON}
                        />
                    )}
                </div>
            )}
        </Layout>
    );
};

const useStyles = makeStyles({
    rootLarge: {
        display: "flex",
        alignItems: "flex-start",
        alignContent: "flex-start",
        justifyContent: "center",
    },
    rootSmall: {
        display: "flex",
        alignItems: "flex-start",
        alignContent: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
    },
});

export default Article;
