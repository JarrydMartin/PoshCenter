// scripts to help with admin tasks while developing

import { GetArticles, UpdateArticle } from "./dataAccess";

// Call to run updates on all artcoles
export const ADMIN_updateArticles = async () => {
    console.log("Running ADMIN_updateArticles...");
    const artciles = await GetArticles();

    artciles.forEach((article) => {
        console.log(`Updating ${article.articleId}....`);
        UpdateArticle({ ...article, editors: [] });
    });
};
