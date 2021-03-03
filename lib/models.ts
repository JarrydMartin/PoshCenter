import { OutputBlockData } from "@editorjs/editorjs";

export interface ArticleFormModel{
    title:string
}

export interface ArticleModel{
    version?: string,
    authorUri: string,
    slug: string,
    title: string,
    time?: number,
    blocks: OutputBlockData[]
}