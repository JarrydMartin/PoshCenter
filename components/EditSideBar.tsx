import { Button } from "@material-ui/core";
import React, { Dispatch } from "react";
import { ARTICLE_MODE } from "../lib/enums";



const EditSideBar = ({
  articleMode,
  setArticleMode
}:{
  articleMode: ARTICLE_MODE;
  setArticleMode?: Dispatch<React.SetStateAction<ARTICLE_MODE>>;
}
) => {

  switch (articleMode) {
    case ARTICLE_MODE.read:
      return (
        <div>
         
        </div>
      );

    case ARTICLE_MODE.edit:
      return (
        <div>
         
        </div>
      );

    default:
      return <div>unknown mode</div>;
  }
};

export default EditSideBar;
