import layout from "../styles/main-layout.module.css";
import React, { Dispatch, MutableRefObject } from "react";
import AuthButton from "./AuthButton";
import NavBar from "./NavBar";
import { ArticleModel, UserModel } from "../lib/models";
import EditorJS from "@editorjs/editorjs";
import Link from "next/link";
import ArticleIndexAside from "./ArticleIndexAside";
import SideBar from "./SideBar";

export function Layout({
    children,
    navComponent,
    asideComponent,
}: {
    children: any;
    asideComponent?: any;
    navComponent?: any;
}) {
    return (
        <div className={layout.pageWrap}>
            <header className={layout.pageHeader}>
                <Link href="/">
                    <a style={{ color: "inherit", textDecoration: "inherit" }}>
                        <h1>Health and Safety Net</h1>
                    </a>
                </Link>
            </header>
            <nav className={layout.pageNav}>
                {navComponent ? (
                    navComponent
                ) : (
                    <NavBar />
                )}
            </nav>
            <main className={layout.pageMain}>{children}</main>
            <aside className={layout.pageSidebar}>
                <>{asideComponent ? asideComponent : <SideBar />}</>
            </aside>
            <footer className={layout.pageFooter}>Footer</footer>
        </div>
    );
}
