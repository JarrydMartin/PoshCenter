import { OutputBlockData } from "@editorjs/editorjs";

export interface ArticleFormModel{
    title:string
}

export interface ArticleModel{
    version?: string,
    authorId: string,
    slug: string,
    title: string,
    time?: number,
    blocks: OutputBlockData[]
}

export interface ArticleType{
    articleId: string,
    name: string,
    slug: string,
    order: number
}