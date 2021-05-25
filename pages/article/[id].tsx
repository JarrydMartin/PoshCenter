import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { ArticleModel, CommentModel } from "../../lib/models";
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
import CommentSection from "../../components/CommentSection";

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

const Article = ({ articleJson }: { articleJson: ArticleModel }) => {
    const router = useRouter();
    const classes = useStyles();

    const isBigScreen = useMediaQuery("(min-width:800px)");

    let editorInstance = useRef<EditorJS>(null);

    const { user } = useContext(UserContext);

    const [article, setArticle] = useState<ArticleModel>(articleJson);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);
    const [comments, setComments] = useState(article.comments);
    const newComment: CommentModel = {
        commenter: "",
        commentId: "",
        order: 0,
        text: "",
    };

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

    const onCommentSave = (c: CommentModel) => {
        const newC: CommentModel= {...c, commenter:user.name};
        const newComments: CommentModel[] = article.comments
            ? article.comments.concat(newC)
            : [newC];
        const newArticle: ArticleModel = { ...article, comments: newComments };
        setArticle(newArticle);
        setComments(newComments);
        UpdateArticle(newArticle);
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
                {article && (
                    <CommentSection
                        cs={comments}
                        newC={newComment}
                        onAdd={onCommentSave}
                    />
                )}
            </div>
        </Layout>
    );
};

const useStyles = makeStyles({
    rootSmall: {
        display: "flex",
        alignItems: "center",
        alignContent: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
    },
});

export default Article;
