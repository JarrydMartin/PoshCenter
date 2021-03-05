import { OutputBlockData } from "@editorjs/editorjs";
import { UserRoles } from "./enums";

export interface ArticleFormModel{
    title:string
}

export interface ArticleModel{
    version?: string,
    authorId: string,
    author: string,
    slug: string,
    title: string,
    time?: number,
    blocks: OutputBlockData[],
    published: boolean,
    articleTypeSlug: string,
    heroImg: string,
    heroDescription: string
}

export interface UserModel{
    uid: string,
    name: string,
    role: UserRoles,
    profileImage: string
}

export interface ArticleType{
    name: string,
    slug: string,
    order: number
}

