import { Avatar, Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";
import Link from "next/link";
import { UserRoles } from "../lib/enums";
import { useUser } from "../lib/hooks";
import UserAvatar from "./Avitar";
import { UserModel } from "../lib/models";

const NavBar = ({
    children,
    user,
    canEdit,
    isSignedIn,
}: {
    children?: any;
    user: UserModel;
    canEdit: boolean;
    isSignedIn: boolean;
}) => {
    const classes = useStyles();

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    const NewArticleButton = () => {
        return (
            <Link href="/article/create">
                <Button color="primary" type="button">
                    New Article
                </Button>
            </Link>
        );
    };

    const SigninButton = () => {
        return (
            <Button className="btn-google" onClick={signInWithGoogle}>
                Sign in
            </Button>
        );
    };

    return (
        <div className={classes.root}>
            {isSignedIn ? (
                <>
                    {canEdit && <NewArticleButton />}
                    {children}
                    <UserAvatar user={user} />
                </>
            ) : (
                <>
                    <UserAvatar user={user} />
                    <SigninButton />
                </>
            )}
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
