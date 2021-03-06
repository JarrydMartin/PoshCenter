import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { auth } from "../../../../lib/firebase";
import { ArticleModel } from "../../../../lib/models";
import { GetArticle, UpdateArticle } from "../../../../lib/dataAccess";
import NavBarAsEditor from "../../../../components/EditNavBar";
import { ArticleMode } from "../../../../lib/enums";
import SideBar from "../../../../components/SideBar";
import { useRouter } from "next/router";
import { UserContext } from "../../../../lib/contexts";


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
    const pageuid = router.query["uid"] as string;

    let editorInstance = useRef<EditorJS>(null);

    const { user } = useContext(UserContext);

    const [isOwner, setIseOwner] = useState<boolean>(false);
    const [article, setArticle] = useState<ArticleModel>(articleJson);
    const [articleMode, setArticleMode] = useState(ArticleMode.READ);

    useEffect(() => {
        if (user?.uid == pageuid) {
            setIseOwner(true);
        }
        if ( articleMode == ArticleMode.READ && isOwner) {
            UpdateArticle(article);
        }
    }, [articleMode]);

    return (
                <Layout
                    asideComponent={
                        <SideBar
                            article={article}
                            setArticle={setArticle}
                            articleMode={articleMode}
                            setArticleMode={setArticleMode}
                        />
                    }
                    navComponent={
                        <NavBarAsEditor
                            articleMode={articleMode}
                            setArticleMode={setArticleMode}
                            article={article}
                            setArticle={setArticle}
                            editorRef={editorInstance}
                        />
                    }>
                    <Editor
                        data={article}
                        editorInstance={editorInstance}
                        isReadOnly={articleMode == ArticleMode.READ}
                        holder={article.articleId}
                        key={article.articleId}
                    />
                </Layout>
    );
};

export default Article;