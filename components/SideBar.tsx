import { Button } from "@material-ui/core";
import React, { Dispatch } from "react";
import { ArticleMode } from "../lib/enums";
import { ArticleModel } from "../lib/models";
import ArticleIndexAside from "./ArticleIndexAside";
import EditArticleAside from "./EditSideBar";

const SideBar = ({
  articleMode,
  setArticleMode,
  article,
  setArticle
}: {
  articleMode?: ArticleMode;
  setArticleMode?: Dispatch<React.SetStateAction<ArticleMode>>;
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
}) => {
  switch (articleMode) {
    case ArticleMode.READ:
      return <ArticleIndexAside />;

    case ArticleMode.EDIT:
      return  <> <h2>Article Properties</h2> <EditArticleAside article={article} setArticle={setArticle}/></>;

    default:
      return <ArticleIndexAside />;
  }
};

export default SideBar;
