import React, { createRef, Dispatch, useEffect, useRef } from "react";
import EditorJs from "react-editor-js";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../lib/constants";
import { ArticleModel } from "../lib/models";
import { makeStyles } from "@material-ui/core";

const Editor = ({
    editorInstance,
    data,
    isReadOnly,
    enableReInitialize,
    holder = "customer",
}: {
    editorInstance: React.MutableRefObject<EditorJS>;
    data: any;
    isReadOnly?: boolean;
    enableReInitialize?: boolean;
    holder?: string;
}) => {
    return (
        <div>
            <EditorJs
                tools={EDITOR_JS_TOOLS}
                instanceRef={(instance) => {
                    if (editorInstance) {
                        editorInstance.current = instance;
                    }
                }}
                holder={holder?holder:"default"}
                enableReInitialize={enableReInitialize}
                data={data}
                readOnly={isReadOnly}>
                <div id={holder?holder:"default"} />
            </EditorJs>
        </div>
    );
};

export default Editor;
