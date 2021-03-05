import {
    Button,
    Card,
    CardActionArea,
    CardActions,
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
        <Card className={classes.root}>
            <Link href={`/user/${article.authorId}/article/${article.slug}`}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={article.heroImg}
                        title={article.title}
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
            </Link>
        </Card>
    );
};

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
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
