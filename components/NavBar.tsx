import { Avatar, Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";
import Link from "next/link";
import UserAvatar from "./Avitar";

const NavBar = ({ children }: { children?: any }) => {
    const classes = useStyles();
    const { canEdit } = useContext(UserContext);

    const NewArticleButton = () => {
        return (
            <Link href="/article/create">
                <Button color="primary" type="button">
                    New Article
                </Button>
            </Link>
        );
    };

    return (
        <div className={classes.root}>
            {canEdit && <NewArticleButton />}
            {children}
            <UserAvatar />
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "& > *": {
            margin: "4px",
        },
        "& > p": {
            fontSize: "18px",
        },
    },
});

export default NavBar;
