import React, { Dispatch, MutableRefObject } from "react";
import { ArticleModel } from "../lib/models";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@material-ui/core";
import NavBar from "./NavBar";
import { ARTICLE_MODE } from "../lib/enums";

const EditNavBar = ({
  articleMode,
  setArticleMode,
  article,
  setArticle,
  editorRef,
}: {
  articleMode: ARTICLE_MODE;
  setArticleMode?: Dispatch<React.SetStateAction<ARTICLE_MODE>>;
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
  editorRef?: MutableRefObject<EditorJS>;
}) => {

  const handleEditClick = async (newArticelMode: ARTICLE_MODE) => {
    if (articleMode == ARTICLE_MODE.edit) {
      const editorData = await editorRef.current.save();
      setArticle({ ...article, ...editorData });
    }
    setArticleMode(newArticelMode);
  };

  const EditArticleButton = () => {
    if (editorRef) {
      switch (articleMode) {
        case ARTICLE_MODE.edit:
          return (
            <Button
              color="primary"
              type="button"
              onClick={() => handleEditClick(ARTICLE_MODE.read)}
            >
              Save Article
            </Button>
          );
          case ARTICLE_MODE.read:
            return (
              <Button
                color="primary"
                type="button"
                onClick={() => handleEditClick(ARTICLE_MODE.edit)}
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
    <NavBar>
      <EditArticleButton />
    </NavBar>
  );
};

export default EditNavBar;
