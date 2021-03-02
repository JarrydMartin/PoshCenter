import layout from "../../styles/main-layout.module.css";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import React, { useRef } from "react";
import AuthButton from "../../components/AuthButton";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import EditorJsContainer from "react-editor-js";
import CreateArticleForm from "../../components/CreateArticleForm";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

function Home() {
  let editorInstance = useRef<EditorJS>(null);
  const AuthUser = useAuthUser();

  const handleSave = async () => {
     const data = await editorInstance.current.save();
     console.log(data)
  };

  return (
    <div className={layout.pageWrap}>
      <header className={layout.pageHeader}>Posh Centre</header>
      <nav className={layout.pageNav}>
        <AuthButton AuthUser={AuthUser} />
      </nav>
      <main className={layout.pageMain}>
        <CreateArticleForm/>
        <button onClick={handleSave}>Create</button>
        <Editor editorInstance={editorInstance} />
      </main>
      <aside className={layout.pageSidebar}>Aside</aside>
      <footer className={layout.pageFooter}>Footer</footer>
    </div>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Home);
