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
    blocks: OutputBlockData[],
    published: boolean,
    articleTypeSlug: string,
    heroImg: string,
    heroDescription: string
}

export interface ArticleType{
    name: string,
    slug: string,
    order: number
}