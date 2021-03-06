import React, { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import { Layout } from "../../components/Layout";
import { Button, makeStyles } from "@material-ui/core";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { AddArticle } from "../../lib/dataAccess";
import AuthCheck from "../../components/AuthCheck";
import { UserRoles } from "../../lib/enums";
import EditArticleAside from "../../components/EditArticleAside";
import { ArticleModel } from "../../lib/models";
import { UserContext } from "../../lib/contexts";

const Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false,
    loading: () => <p>loading editor.js ...</p>,
});

function Home() {
    const { user } = useContext(UserContext);
    let editorInstance = useRef<EditorJS>(null);
    const [article, setArticle] = useState<ArticleModel>(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const defaultArticle: ArticleModel = {
                articleTypeSlug: "",
                articleId: "00000",
                author: user.name,
                authorId: user.uid,
                blocks: [{"type":"paragraph","data":{"text":"Start typing here..."}}],
                heroDescription: "",
                heroImg: "",
                published: false,
                title: "",
            };
            setArticle(defaultArticle);
        }
    }, [user]);

    const createArticle = async (e) => {
        e.preventDefault();

        const editorData = await editorInstance.current.save();
        const newArticle: ArticleModel = {
            ...article,
            ...editorData,
        };

        const articleId = await AddArticle(auth.currentUser.uid, newArticle);

        articleId &&
            router.push(`/user/${auth.currentUser.uid}/article/${articleId}`);
    };

    return (
        <Layout
            asideComponent={
                <AuthCheck roleAccess={UserRoles.EDITOR}>
                    <>
                        <h2>Create Article</h2>
                        {article && (
                            <>
                                <EditArticleAside
                                    article={article}
                                    setArticle={setArticle}
                                />
                                <Button
                                    type="submit"
                                    color={"primary"}
                                    onClick={createArticle}>
                                    Create
                                </Button>
                            </>
                        )}
                    </>
                </AuthCheck>
            }>
            <AuthCheck roleAccess={UserRoles.EDITOR}>
                <Editor editorInstance={editorInstance} data={article} />
            </AuthCheck>
        </Layout>
    );
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "& > *": {
            margin: "4px",
        },
        "& > p": {
            fontSize: "18px",
        },
    },
});
export default Home;
