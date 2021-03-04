import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { ArticleModel } from "../lib/models";

const ArticleCard = ({ article }: { article: ArticleModel }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {article.title}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Link href={`/user/${article.authorId}/article/${article.slug}`}>
          <Button>Open</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    minWidth: 200,
    margin: "16px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 28,
  },
  pos: {
    marginBottom: 12,
  },
  action: {
    display: "inline-block",
  },
});

export default ArticleCard;
