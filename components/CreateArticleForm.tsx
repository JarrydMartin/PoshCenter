import { TextField } from "@material-ui/core";

import React from "react";
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
        value={fields.title}
        onChange={(e) => setFields({ ...fields, title: e.target.value })}
      />
    </form>
  );
};

export default CreateArticleForm;
