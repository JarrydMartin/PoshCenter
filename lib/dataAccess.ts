import { firestore } from "./firebase";
import { ArticleModel, ArticleType } from "./models";

export async function GetArticle(UserId: string, articleSlug: string) {
    try {
        const articleRef = firestore
            .collection("users")
            .doc(UserId)
            .collection("articles")
            .doc(articleSlug);
        const doc = await articleRef.get();
        return doc.data();
    } catch (error) {
        console.log(error);
    }
    return {}
}
export async function GetUserArticles(UserId: string) {
  let data: any[] = [];
    try {
        
        const userRef = firestore
            .collection("users")
            .doc(UserId)
            .collection("articles");
        const snapshot = await userRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data());
        });

        
    } catch (error) {
        console.log(error);
    }
    return data;
}

export async function GetPublishedArticlesByType(typeSlug: string) {
  let data: any[] = [];
    try {
       
        const articleRef = firestore
            .collectionGroup("articles")
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

export async function UpdateArticle(
    UserId: string,
    articleSlug: string,
    article: ArticleModel
) {
    try {
        await firestore
            .collection("users")
            .doc(UserId)
            .collection("articles")
            .doc(articleSlug)
            .set(article);
    } catch (error) {
        console.log(error);
    }
}

export async function AddArticle(
    UserId: string,
    articleSlug: string,
    article: ArticleModel
) {
    try {
        const ref = firestore
            .collection("users")
            .doc(UserId)
            .collection("articles")
            .doc(articleSlug);
        await ref.set(article);
    } catch (error) {
        console.log(error);
    }
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
        const userRef = firestore.collection("articleTypes");
        const snapshot = await userRef.get();
        snapshot.forEach((doc) => {
            data.push(doc.data() as ArticleType);
        });
        return data;
    } catch (error) {
        console.log(error);
    }
    return {};
}
