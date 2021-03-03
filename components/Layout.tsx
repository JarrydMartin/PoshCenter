import layout from "../styles/main-layout.module.css";
import React, { Dispatch } from "react";
import AuthButton from "./AuthButton";
import NavBar from "./NavBar";

export function Layout({
  children,
  editMode,
  setEditMode,
}: {
  children: any;
  editMode?: boolean;
  setEditMode?: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={layout.pageWrap}>
      <header className={layout.pageHeader}>Posh Centre</header>
      <nav className={layout.pageNav}>
        <NavBar editMode={editMode} setEditMode={setEditMode} />
      </nav>
      <main className={layout.pageMain}>{children}</main>
      <aside className={layout.pageSidebar}>Aside</aside>
      <footer className={layout.pageFooter}>Footer</footer>
    </div>
  );
}
