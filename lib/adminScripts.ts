// scripts to help with admin tasks while developing

import { AddLike, GetArticles, UpdateArticle } from "./dataAccess";

// Call to run updates on all artcoles
export const ADMIN_updateArticles = async () => {
    // console.log("Running ADMIN_updateArticles...");
    // const artciles = await GetArticles();

    // artciles.forEach((article) => {
    //     console.log(`Updating ${article.articleId}....`);
    //     UpdateArticle({ ...article, likes: [] });
    // });

    const artciles = await GetArticles();
    console.log("Running ADMIN_updateArticles...");
    artciles.forEach(article => {
        console.log(`Updating ${article.articleId}....`);
        article.likes.forEach(like => {
            console.log(`like: ${like}....`);
            AddLike(article.articleId, like);
        })
    });
};

