import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { ArticleModel } from "../lib/models";

const ArticleCard = ({ article }: { article: ArticleModel }) => {
    const classes = useStyles();

    return (
        <Link href={`/article/${article.articleId}`}>
        <Card className={classes.root}>
           
                <CardActionArea>
              
                    <CardMedia
                        className={classes.media}
                        image={article.heroImg}
                        title={article.title}
                        src={article.heroImg}
                    />

                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom>
                            {article.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            {article.heroDescription}
                        </Typography>
                    </CardContent>
                    
                </CardActionArea>
            
        </Card>
        </Link>
    );
};

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
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
    media: {
        height: 140,
    },
});

export default ArticleCard;
