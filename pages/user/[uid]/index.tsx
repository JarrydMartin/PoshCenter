import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import ArticleCard from "../../../components/ArticleCard";
import { Layout } from "../../../components/Layout";
import {
    GetPublishedUserArticles,
    GetUserArticles,
} from "../../../lib/dataAccess";
import { makeStyles } from "@material-ui/core";

const UserIndex = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState(null);
    const router = useRouter();
    const uid = router.query["uid"] as string;

    const getArticles = async () => {
        const userArticles = await GetPublishedUserArticles(uid);
        setArticles(
            userArticles.map((a) => <ArticleCard key={a.slug} article={a} />)
        );
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <Layout>
            <div className={classes.root}>{articles}</div>
        </Layout>
    );
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },
});

export default UserIndex;
