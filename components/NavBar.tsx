import { Avatar, Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";
import Link from "next/link";
import { UserRoles } from "../lib/enums";
import { useUser } from "../lib/hooks";

const NavBar = ({
  children,
  
}: {
  children?:any
  
}) => {
  const classes = useStyles();
  const {user, canEdit, isSignedIn}  = useUser();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  
  const NavProfile = () => {
    return (
      <>
        <Link href={`/profile`}>
          <a>
            <Avatar alt={user?.name} src={user?.profileImage} />
          </a>
        </Link>
       
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

  const SignOutButton = () => {
   return (<Button onClick={() => auth.signOut()}>Sign Out</Button> )
  }

 
  return (
    <div className={classes.root}>
      
      {isSignedIn? (
        <>
        {canEdit && <NewArticleButton />}
          {children}
          <NavProfile />
        </>
        
      ) : (
        <>
        <NavProfile />
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
