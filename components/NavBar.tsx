import { Avatar, Button, Link, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";

const NavBar = () => {
  const classes = useStyles();
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const NavProfile = () => {
    return (
      <>
        <p>{user?.displayName}</p>
        <Link href={`/user/${user?.uid}`}>
          <Avatar alt={user?.displayName} src={user?.photoURL} />
        </Link>
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      </>
    );
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

  const { user } = useContext(UserContext);
  return (
    <div className={classes.root}>
      
      {user ? <><NewArticleButton /><NavProfile /></> : <SigninButton />}
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
