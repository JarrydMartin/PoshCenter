import { firestore } from "./firebase";
import { ArticleModel } from "./models";

export async function GetArticle(UserId: string, articleSlug: string) {
  const articleRef = firestore
    .collection("users")
    .doc(UserId)
    .collection("articles")
    .doc(articleSlug);
  const doc = await articleRef.get();
  return doc.data();
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
