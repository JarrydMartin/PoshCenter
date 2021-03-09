import React, { Dispatch, MutableRefObject } from "react";
import { ArticleModel, UserModel } from "../lib/models";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@material-ui/core";
import NavBar from "./NavBar";
import { ArticleMode } from "../lib/enums";

const NavBarAsEditor = ({
  articleMode,
  setArticleMode,
  article,
  setArticle,
  editorRef,
  onSave,
}: {
  articleMode: ArticleMode;
  setArticleMode?: Dispatch<React.SetStateAction<ArticleMode>>;
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
  editorRef?: MutableRefObject<EditorJS>;
  onSave?: () => void;
}) => {

  const handleEditClick = async (newArticelMode: ArticleMode) => {
    if (articleMode == ArticleMode.EDIT) {
      const editorData = await editorRef.current.save();
      setArticle({ ...article, ...editorData });
      onSave();
    }
    setArticleMode(newArticelMode);
  };

  const EditArticleButton = () => {
    if (editorRef) {
      switch (articleMode) {
        case ArticleMode.EDIT:
          return (
            <Button
              color="primary"
              type="button"
              onClick={() => handleEditClick(ArticleMode.READ)}
            >
              Save Article
            </Button>
          );
          case ArticleMode.READ:
            return (
              <Button
                color="primary"
                type="button"
                onClick={() => handleEditClick(ArticleMode.EDIT)}
              >
                Edit Article
              </Button>
            );
        default:
          break;
      }
    } else {
      return <></>;
    }
  };

  return (
    <NavBar >
      <EditArticleButton />
    </NavBar>
  );
};

export default NavBarAsEditor;
