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
                        <h1>Health &amp; Safety Net</h1>
                    </a>
                </Link>
            </header>
           
            <main className={layout.pageMain}>{children}</main>
            <nav className={layout.pageNav}>
                {navComponent ? (
                    navComponent
                ) : (
                    <NavBar />
                )}
            </nav>
            <aside className={layout.pageSidebar}>
                <>{asideComponent ? asideComponent : <SideBar />}</>
            </aside>
            <footer className={layout.pageFooter}><small>Contact jarryd.martin@worksafe.govt.nz for any techincal issues</small></footer>
        </div>
    );
}
