import CommentSection from "../components/CommentSection";
import { ArticleModel, CommentModel } from "./models";

export const emptyComments: CommentModel[] = [];

export const emptyArticle: ArticleModel = {
    articleId: "",
    articleTypeSlug: "",
    author: "",
    authorId: "",
    blocks: [],
    comments: emptyComments,
    editors: [],
    heroDescription: "",
    heroImg: "",
    likes: [],
    published: false,
    title: "",
    time: 0,
    version: "",
};

export const appendComment = (comments: CommentModel[]) => (comment: CommentModel) => {
    return comments.concat(comment);
};

export const calculatNextRank = (comments: CommentModel[]) =>
    comments
        ? comments.reduce((max, curr) => (max.order > curr.order ? max : curr))
              .order + 1
        : 0;
 
export const updateCommentOrder = (comment:CommentModel) => (order:number) => <CommentModel>{...comment, order:order};

export const updateCommentText = (comment:CommentModel) => (text:string) => <CommentModel>{...comment, text:text};
