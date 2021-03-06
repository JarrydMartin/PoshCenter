import Article from "../pages/article/[id]";

import { ArticleMode, UserRoles } from "./enums";
import { firestore, auth } from "./firebase";
import { ArticleModel, ArticleType, UserModel } from "./models";
import { EDITOR_ROLES } from "./userConstants";

/**
 * GetArticle
 *
 * Get an article by its Id
 *
 * @param articleId
 * @returns ArtilceModel
 */
export async function GetArticle(articleId: string) {
    try {
        const articleRef = firestore.collection("articles").doc(articleId);
        const doc = await articleRef.get();
        return doc.data();
    } catch (error) {
        console.log(error);
    }
    return {};
}

/**
 * AddArticle
 *
 * Addes an article to the database
 *
 * @param article new artilce to be added
 * @returns new article Id
 */
export async function AddArticle(article: ArticleModel) {
    try {
        const ref = firestore.collection("articles");
        const newArticleRef = await ref.add(article);
        await UpdateArticle({ ...article, articleId: newArticleRef.id });
        return newArticleRef.id;
    } catch (error) {
        console.log(error);
    }
}

/**
 * UpdateArticle
 *
 * Update the already existing arting with a new one
 * @param article new article to replace the already exsity one
 */
export async function UpdateArticle(article: ArticleModel) {
    try {
        await firestore
            .collection("articles")
            .doc(article.articleId)
            .set(article);
    } catch (error) {
        console.log(error);
    }
}

/**
 * GetArticlesByAuthorId
 *
 * Get carticles by the author id
 */
export async function GetArticlesByAuthorId(authorId: string) {
    let data: any[] = [];
    try {
        const articleRef = firestore
            .collectionGroup("articles")
            .where("authorId", "==", authorId)
            .orderBy("time", "desc");

        const snapshot = await articleRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data());
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

/**
 * Delete article by Id
 *
 * @param articleId
 */
export async function DeleteArticle(articleId: string) {
    await firestore.collection("articles").doc(articleId).delete();
}

/**
 * GetArticles
 *
 * Get all articles
 */
export async function GetArticles() {
    let data: ArticleModel[] = [];
    try {
        const articleRef = firestore.collection("articles");

        const snapshot = await articleRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data() as ArticleModel);
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

/**
 * GetPublishedArticlesByType
 *
 * Get all publushed articles by article type
 * @param typeSlug
 * @returns
 */
export async function GetPublishedArticlesByType(typeSlug: string) {
    let data: any[] = [];
    try {
        const articleRef = firestore
            .collection("articles")
            .where("articleTypeSlug", "==", typeSlug)
            .where("published", "==", true)
            .orderBy("time", "desc");

        const snapshot = await articleRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data());
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

/**
 * GetPubliedArticlesByAuthorId
 *
 * Get publsuhed articles by the author id
 */
export async function GetPublishedArticlesByAuthorId(authorId: string) {
    let data: any[] = [];
    try {
        const articleRef = firestore
            .collectionGroup("articles")
            .where("authorId", "==", authorId)
            .where("published", "==", true)
            .orderBy("time", "desc");

        const snapshot = await articleRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data());
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

export async function AddArticleType(articleType: ArticleType) {
    try {
        const ref = firestore.collection("articleTypes").doc(articleType.slug);

        await ref.set(articleType);
    } catch (error) {
        console.log(error);
    }
}

export async function GetArticleTypes() {
    try {
        let data: ArticleType[] = [];
        const userRef = firestore
            .collection("articleTypes")
            .orderBy("order", "asc")
           
            
            
        const snapshot = await userRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data() as ArticleType);
        });
        return data;
    } catch (error) {
        console.log(error);
    }
    return [] as ArticleType[];
}

export async function GetArticleType(slug: string) {
    try {
        let data: ArticleType;
        const userRef = firestore.collection("articleTypes").doc(slug);
        const snapshot = await userRef.get();
        data = snapshot.data() as ArticleType;
        return data;
    } catch (error) {
        console.log(error);
    }
    return {} as ArticleType;
}

export async function UpdateArticleType(article: ArticleType) {
    try {
        await firestore
            .collection("articleTypes")
            .doc(article.slug)
            .set(article);
    } catch (error) {
        console.log(error);
    }
}

//########## User #############

export async function GetUsers() {
    let data: UserModel[] = [];
    try {
        const articleRef = firestore.collection("users");

        const snapshot = await articleRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data() as UserModel);
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

export async function GetEditors() {
    let data: UserModel[] = [];
    try {
        const articleRef = firestore.collection("users")
        .where("role", "in", EDITOR_ROLES);

        const snapshot = await articleRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data() as UserModel);
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

// #################### likes ######################

export async function GetLikes(articleId: string){
    let data: string[] = [];
    try {
        const articleRef = firestore.collection("articles").doc(articleId);

        const snapshot = await articleRef.collection("likes").get();

        snapshot.forEach((doc) => {
            data.push(doc.id as string);
        });
    } catch (error) {
        console.log(error.message);
    }
    return data;
}

export async function AddLike(articleId: string, userId:string){
    try {
        const ref = firestore.collection("articles").doc(articleId).collection("likes").doc(userId);
        await ref.set({userId: userId});
    } catch (error) {
        console.log(error);
    }
}

export async function DeleteLike(articleId: string, userId:string) {
    await firestore.collection("articles").doc(articleId).collection("likes").doc(userId).delete();
}



export async function HasUserHearted(articleId: string, uid: string) {}

// export async function GetArticleOld(UserId: string, articleSlug: string) {
//     try {
//         const articleRef = firestore
//             .collection("users")
//             .doc(UserId)
//             .collection("articles")
//             .doc(articleSlug);
//         const doc = await articleRef.get();
//         return doc.data();
//     } catch (error) {
//         console.log(error);
//     }
//     return {}
// }

// export async function AddArticleOld(
//     UserId: string,
//     article: ArticleModel
// ) {
//     try {
//         const ref = firestore
//             .collection("users")
//             .doc(UserId)
//             .collection("articles")
//         const newArticleRef =  await ref.add(article);
//         await UpdateArticle({...article, articleId:newArticleRef.id})
//         return newArticleRef.id;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function GetPublishedUserArticles(UserId: string) {
//     let data: any[] = [];
//       try {

//           const userRef = firestore
//               .collection("users")
//               .doc(UserId)
//               .collection("articles")
//               .where("published", "==", true);
//           const snapshot = await userRef.get();
//           snapshot.forEach((doc) => {
//               data.push(doc.data());
//           });

//       } catch (error) {
//           console.log(error);
//       }
//       return data;
//   }

// export async function GetUserArticles(UserId: string) {
//   let data: any[] = [];
//     try {
//         const userRef = firestore
//             .collection("users")
//             .doc(UserId)
//             .collection("articles");
//         const snapshot = await userRef.get();
//         snapshot.forEach((doc) => {
//             data.push(doc.data());
//         });
//     } catch (error) {
//         console.log(error);
//     }
//     return data;
// }
