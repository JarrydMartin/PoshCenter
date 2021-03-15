import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
} from "@material-ui/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArticleModel } from "../lib/models";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { GetLikes } from "../lib/dataAccess";

const ArticleCard = ({ article }: { article: ArticleModel }) => {
    const classes = useStyles();
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data :string[] = await GetLikes(article.articleId);
            const likeCount =  data.length;
            setLikes(likeCount);
        }
        fetchData();
    }, [])

    return (
        <Link href={`/article/${article.articleId}`}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={article.heroImg}
                        title={article.title}
                        src={article.heroImg}>
                        <div className={classes.like}>
                            
                            <FavoriteIcon color="primary" className={classes.likeIcon}/> 
                            {likes < 10?<Typography className={classes.likeTextSingle}>
                                    {likes}
                                </Typography>:
                                <Typography className={classes.likeTextDouble}>
                                {likes}
                            </Typography>
                                }
                                
                        </div>
                    </CardMedia>

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
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            <br />
                        </Typography>

                        <Typography
                            variant="caption"
                            color="textSecondary"
                            component="p">
                            by {article.author}
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
    like: {
        right: "0px",
        position: "absolute",
        margin: "8px",
        

    },
    likeIcon:{
        fontSize: "48px"
    },
    likeTextSingle: {
        top: "-4px",
        right: "2px",
        padding: "16px",
        position: "absolute",
        fontWeight: "bold",
        color:"#fcf9ec"
    },
    likeTextDouble: {
        top: "-4px",
        right: "-1px",
        padding: "16px",
        position: "absolute",
        fontWeight: "bold",
        color:"#fcf9ec"
    },
});

export default ArticleCard;
function useSate(arg0: number): [any, any] {
    throw new Error("Function not implemented.");
}

