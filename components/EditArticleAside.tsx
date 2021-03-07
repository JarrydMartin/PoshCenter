import {
    Button,
    createStyles,
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Switch,
    TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { userInfo } from "node:os";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/contexts";
import { DeleteUserArticle, GetArticleTypes } from "../lib/dataAccess";
import { ArticleModel, ArticleType, UserModel } from "../lib/models";
import ImageUploader from "./ImgaeUploader";

const EditArticleAside = ({
    article,
    setArticle,
}: {
    article?: ArticleModel;
    setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
}) => {
    const classes = useStyles();
    const [articleTypes, setArticleTypes] = useState<ArticleType[]>([]);
    const router = useRouter();

    const { user } = useContext(UserContext);

    const getArticleTypes = async () => {
        const data = await GetArticleTypes();
        setArticleTypes(data);
    };

    const deleteArticle = async () => {
        await DeleteUserArticle(user.uid, article.articleId);
        router.push("/profile");
    };

    useEffect(() => {
        getArticleTypes();
    }, []);

    return (
        <div className={classes.root}>
            <form noValidate autoComplete="off" className={classes.form} >
                <TextField
                    id="title"
                    label="Title"
                    value={article.title}
                    onChange={(e) =>
                        setArticle({ ...article, title: e.target.value })
                    }
                />
                <TextField
                    id="disc"
                    label="Description"
                    multiline
                    value={article.heroDescription}
                    onChange={(e) =>
                        setArticle({
                            ...article,
                            heroDescription: e.target.value,
                        })
                    }
                />
                <TextField
                    id="heroImage"
                    label="Display Image"
                    value={article.heroImg}
                    onChange={(e) =>
                        setArticle({ ...article, heroImg: e.target.value })
                    }
                />

                <FormControl>
                    <InputLabel id="articleType">Type</InputLabel>
                    <Select
                        labelId="articleType"
                        id="articleType"
                        value={article.articleTypeSlug}
                        onChange={(e) =>
                            setArticle({
                                ...article,
                                articleTypeSlug: e.target.value as string,
                            })
                        }>
                        {articleTypes.map((a) => (
                            <MenuItem value={a.slug}> {a.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Switch
                            checked={article.published}
                            onChange={(e) =>
                                setArticle({
                                    ...article,
                                    published: e.target.checked,
                                })
                            }
                            name="published"
                            color="primary"
                        />
                    }
                    label="Published"
                />
                <ImageUploader user={user} />
                
            </form>
            <Button
                    onClick={deleteArticle}>
                    Delete
            </Button>
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            "& > form": {
              paddingBottom: "160px",
          },
        },
        form: {
          display: "flex",
          flexDirection: "column",
          alignContenttent: "flexStart",
          "& > *": {
              paddingBottom: "24px",
          },
      },
    })
);

export default EditArticleAside;
