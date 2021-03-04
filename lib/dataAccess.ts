import { firestore } from "./firebase";
import { ArticleModel, ArticleType } from "./models";

export async function GetArticle(UserId: string, articleSlug: string) {
  const articleRef = firestore
    .collection("users")
    .doc(UserId)
    .collection("articles")
    .doc(articleSlug);
  const doc = await articleRef.get();
  return doc.data();
}
export async function GetUserArticles(UserId: string) {

  let data:any[]= [];
  const userRef = firestore.collection('users').doc(UserId).collection("articles");
  const snapshot = await userRef.get();
  snapshot.forEach(doc => {
    data.push(doc.data());
  });
  
  return data
}


export async function UpdateArticle(
  UserId: string,
  articleSlug: string,
  article: ArticleModel
) {
  await firestore
    .collection("users")
    .doc(UserId)
    .collection("articles")
    .doc(articleSlug)
    .set(article);
}

export async function AddArticle(
  UserId: string,
  articleSlug: string,
  article: ArticleModel
) {
  const ref = firestore
    .collection("users")
    .doc(UserId)
    .collection("articles")
    .doc(articleSlug);
  await ref.set(article);
}

export async function AddArticleType(
  articleType: ArticleType
) {
  const ref = firestore
    .collection("articleTypes")
    .doc(articleType.slug)

  await ref.set(articleType);
}

export async function GetArticleTypes() {

  let data:ArticleType[]= [];
  const userRef = firestore.collection("articleTypes");
  const snapshot = await userRef.get();
  snapshot.forEach(doc => {
    data.push(doc.data() as ArticleType);
  });
  return data 
}
