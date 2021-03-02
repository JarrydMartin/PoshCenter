import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import CreateArticleForm from "../../components/CreateArticleForm";
import { Layout } from "../../components/Layout";
import { ArticleFormModel } from "../../lib/models";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

function Home() {
  let editorInstance = useRef<EditorJS>(null);
  let formRef = useRef(null)
  const [fields, setFields] = useState<ArticleFormModel>({Title:""});
  const handleSave = async () => {
     const data = await editorInstance.current.save();
     formRef.current
     console.log(fields)
     console.log(data)
  };

  return (
    <Layout>
        <CreateArticleForm fields={fields} setFields={setFields}/>
        <button onClick={handleSave}>Create</button>
        <Editor editorInstance={editorInstance} />
    </Layout>
  );
}
export default (Home);
