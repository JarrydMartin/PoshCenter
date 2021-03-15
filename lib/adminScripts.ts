// scripts to help with admin tasks while developing

import { AddLike, GetArticles, UpdateArticle } from "./dataAccess";

// Call to run updates on all artcoles
export const ADMIN_updateArticles1 = async () => {
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
        if (article.authorId == "fpB5LqjLulfNflMa5Jd2lpFNbnt1"){
            UpdateArticle({ ...article, authorId:"nxHTXoNc9RUkHUIIowA4DNlbxfE3", author: "Rob Cousins"  })
        }
        // article.likes.forEach(like => {
        //     console.log(`like: ${like}....`);
        //     AddLike(article.articleId, like);
        // })
    });
};

