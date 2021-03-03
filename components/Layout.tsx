import layout from "../styles/main-layout.module.css";
import React from "react";
import AuthButton from "./AuthButton";
import NavBar from "./NavBar";


export function Layout({ children }: { children: any }) {
  return (
    <div className={layout.pageWrap}>
      <header className={layout.pageHeader}>Posh Centre</header>
      <nav className={layout.pageNav}>
        <NavBar />
      </nav>
      <main className={layout.pageMain}>{children}</main>
      <aside className={layout.pageSidebar}>Aside</aside>
      <footer className={layout.pageFooter}>Footer</footer>
    </div>
  );
}
