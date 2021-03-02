import { TextField } from "@material-ui/core";

import React, { Dispatch, SetStateAction } from "react";
import { ArticleFormModel } from "../lib/models";

const CreateArticleForm = ({
  fields,
  setFields,
}: {
  fields: ArticleFormModel;
  setFields: React.Dispatch<React.SetStateAction<ArticleFormModel>>;
}) => {
  return (
    <form>
      <TextField
        placeholder="Title"
        value={fields.Title}
        onChange={(e) => setFields({ ...fields, Title: e.target.value })}
      />
    </form>
  );
};

export default CreateArticleForm;
