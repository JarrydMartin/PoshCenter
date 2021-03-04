import { Button } from "@material-ui/core";
import React, { Dispatch } from "react";
import { ARTICLE_MODE } from "../lib/enums";
import { ArticleModel } from "../lib/models";
import ArticleIndexAside from "./ArticleIndexAside";
import EditArticleAside from "./EditSideBar";

const SideBar = ({
  articleMode,
  setArticleMode,
  article,
  setArticle
}: {
  articleMode?: ARTICLE_MODE;
  setArticleMode?: Dispatch<React.SetStateAction<ARTICLE_MODE>>;
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
}) => {
  switch (articleMode) {
    case ARTICLE_MODE.read:
      return <ArticleIndexAside />;

    case ARTICLE_MODE.edit:
      return <EditArticleAside article={article} setArticle={setArticle}/>;

    default:
      return <ArticleIndexAside />;
  }
};

export default SideBar;
