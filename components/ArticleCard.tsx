import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'
import { ArticleModel } from '../lib/models';

const useStyles = makeStyles({
    root: {
      maxWidth: 275,
      margin:"16px"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 28,
    },
    pos: {
      marginBottom: 12,
    },
    action: {
        display: 'inline-block'
    }
  });

const ArticleCard = ({article}:{article:ArticleModel}) => {
    const classes = useStyles();

    return (
      <Card className={classes.root} >
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {article.title}
          </Typography>
        </CardContent>
        <CardActions className={classes.action}>
        <Link href={`/user/${article.authorUri}/article/${article.slug}`}>
          <Button>Open</Button>
          </Link>
        </CardActions>
      </Card>
    );
}

export default ArticleCard
