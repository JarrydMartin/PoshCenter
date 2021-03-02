import layout from "../styles/main-layout.module.css";
import React from "react";

export function Layout({children}:{children:any}){
  return (
    <div className={layout.pageWrap}>
      <header className={layout.pageHeader}>Posh Centre</header>
      <nav className={layout.pageNav}>
      </nav>
      <main className={layout.pageMain}>
       {children}
      </main>
      <aside className={layout.pageSidebar}>Aside</aside>
      <footer className={layout.pageFooter}>Footer</footer>
    </div>
  );
}