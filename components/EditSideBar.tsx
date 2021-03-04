import { Button, createStyles, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, Switch, TextField } from "@material-ui/core";
import React, { Dispatch, useEffect, useState } from "react";
import { GetArticleTypes } from "../lib/dataAccess";
import { ARTICLE_MODE } from "../lib/enums";
import { ArticleModel, ArticleType } from "../lib/models";
import ArticleIndexAside from "./ArticleIndexAside";

const EditArticleAside = ({
  article,
  setArticle,
}: {
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
}) => {

  const classes = useStyles();
  const [articleTypes, setArticleTypes] = useState<ArticleType[]>([])

  const getArticleTypes = async () => {
    const data = await GetArticleTypes();
    setArticleTypes(data)
  }

  useEffect(() => {
      getArticleTypes();
  }, [])

  return (
    <div>
      <h2>Article Properties</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          id="title"
          label="Title"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
         
       <FormControl>
        <InputLabel id="articleType">Type</InputLabel>
        <Select
          labelId="articleType"
          id="articleType"
          value={article.articleTypeSlug}
          onChange={(e) => setArticle({ ...article, articleTypeSlug: e.target.value as string })}
        >
          {articleTypes.map(a => <MenuItem value={a.slug}> {a.name }</MenuItem>)}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={article.published}
            onChange={(e) => setArticle({ ...article, published: e.target.checked })}
            name="published"
            color="primary"
          />
        }
        label="Published"
      />
      </form>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        paddingBottom: "24px"
      }
    },
  }),
);


export default EditArticleAside;
