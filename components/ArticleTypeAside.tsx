import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GetArticleTypes } from "../lib/dataAccess";
import BuildIcon from '@material-ui/icons/Build';

const ArticleTypeAside = () => {
  const [articleTypes, setArticleTypes] = useState(null);

  const getData = async () => {
    const data = await GetArticleTypes();
    console.log(data);
    setArticleTypes(
      data.map((a) => (
        <ArticleTypeItem to={`/article/${a.slug}`} primary={a.name} />
      ))
    );
  };

  useEffect(() => {
    getData();
    console.log(articleTypes);
  }, []);
  return (
    <div>
      <List component="nav" aria-label="main index navigation">
        {articleTypes}
      </List>
    </div>
  );
};

function ArticleTypeItem(props) {
    const { icon, primary, to } = props
    return (
          <Link  href={to}>
            <ListItem button>
            <ListItemText primary={primary} />
            </ListItem>
        </Link>
    );
  }

export default ArticleTypeAside;
