import React, { createRef, Dispatch, useEffect, useRef } from "react";
import EditorJs from "react-editor-js";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../lib/constants";
import { ArticleModel } from "../lib/models";

const Editor = ({
  editorInstance,
  data,
  isReadOnly,
  holder = "customer"
}: {
  editorInstance: React.MutableRefObject<EditorJS>;
  data: ArticleModel;
  isReadOnly?: boolean;
  holder?: string
  
}) => {
  return (
    <EditorJs
      tools={EDITOR_JS_TOOLS}
      instanceRef={(instance) => {
        if (editorInstance) {
          editorInstance.current = instance;
        }
      }}
      data={data}
      readOnly={isReadOnly}
      />
  );
};

export default Editor;
