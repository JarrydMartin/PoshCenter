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
import CreateArticleForm from "../../components/CreateArticleForm";
import { Layout } from "../../components/Layout";

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
    <Layout AuthUser={AuthUser}>
        <CreateArticleForm/>
        <button onClick={handleSave}>Create</button>
        <Editor editorInstance={editorInstance} />
    </Layout>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Home);
