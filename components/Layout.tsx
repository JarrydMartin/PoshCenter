import layout from "../styles/main-layout.module.css";
import React from "react";
import Link from "next/link";
import AuthButton from "../components/AuthButton";
import { AuthUserContext } from "next-firebase-auth";

export function Layout({AuthUser, children}:{AuthUser:AuthUserContext,children:any}){
  return (
    <div className={layout.pageWrap}>
      <header className={layout.pageHeader}>Posh Centre</header>
      <nav className={layout.pageNav}>
          <AuthButton AuthUser={AuthUser} />
      </nav>
      <main className={layout.pageMain}>
       {children}
      </main>
      <aside className={layout.pageSidebar}>Aside</aside>
      <footer className={layout.pageFooter}>Footer</footer>
    </div>
  );
}