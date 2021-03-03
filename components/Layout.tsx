import layout from "../styles/main-layout.module.css";
import React, { Dispatch, MutableRefObject } from "react";
import AuthButton from "./AuthButton";
import NavBar from "./NavBar";
import { ArticleModel } from "../lib/models";
import EditorJS from "@editorjs/editorjs";

export function Layout({
  children,
  editMode,
  setEditMode,
  article,
  setArticle,
  editorRef,
}: {
  children: any;
  editMode?: boolean;
  setEditMode?: Dispatch<React.SetStateAction<boolean>>;
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
  editorRef?:MutableRefObject<EditorJS>;
}) {
  return (
    <div className={layout.pageWrap}>
      <header className={layout.pageHeader}>Posh Centre</header>
      <nav className={layout.pageNav}>
        <NavBar
          editMode={editMode}
          setEditMode={setEditMode}
          article={article}
          setArticle={setArticle}
          editorRef={editorRef}
        />
      </nav>
      <main className={layout.pageMain}>{children}</main>
      <aside className={layout.pageSidebar}>Aside</aside>
      <footer className={layout.pageFooter}>Footer</footer>
    </div>
  );
}
