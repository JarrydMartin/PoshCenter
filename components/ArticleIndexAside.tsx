import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetArticleTypes } from "../lib/dataAccess";

const ArticleIndexAside = () => {
  const router = useRouter();
  const slug = router.query['slug'] as string
  const [articleTypes, setArticleTypes] = useState(null);

  const getData = async () => {
    const data = await GetArticleTypes();
  
    setArticleTypes(
      data
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map((a) => (
          <ArticleTypeItem key={a.slug} to={`/article/${a.slug}`} primary={a.name}  isSelected={a.slug === slug} />
        ))
    );
  };

  useEffect(() => {
    getData();
  }, [router]);
  return (
    <div>
      <h2>Index</h2>
      <List component="nav" aria-label="main index navigation">
        {articleTypes}
      </List>
    </div>
  );
};

function ArticleTypeItem(props) {
  const { icon, primary, to, isSelected } = props;
  return (
    <Link href={to}>
      <ListItem button selected={isSelected}>
        <ListItemText primary={primary} />
      </ListItem>
    </Link>
  );
}

export default ArticleIndexAside;
