import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { ArticleModel } from '../lib/models'
import ArticleCard from './ArticleCard'

const ArticleCardList = ({articles}:{articles:ArticleModel[]}) => {
    const classes = useStyles();
    const articleList =  articles.map(a => <ArticleCard key={a.articleId} article={a}/>);
    
    return (
        <div className={classes.root}>
          {articleList}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap"
    },
  });

export default ArticleCardList
