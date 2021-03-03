import { Avatar, Button, Link, makeStyles } from "@material-ui/core";
import React, { Dispatch, MutableRefObject, useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";
import { ArticleModel } from "../lib/models";
import EditorJS from "@editorjs/editorjs";

const NavBar = ({
  editMode,
  setEditMode,
  article,
  setArticle,
  editorRef
}: {
  editMode: boolean;
  setEditMode?: Dispatch<React.SetStateAction<boolean>>;
  article?: ArticleModel;
  setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
  editorRef?:MutableRefObject<EditorJS>;
}) => {
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

  const handleEditClick = async () => {
    if(editMode){
      const editorData = await editorRef.current.save();
      setArticle({...article, ...editorData})
    }
    setEditMode(!editMode)
  }

  const EditArticleButton = () => {
    if(editorRef){
    return (
      <Button
        color="primary"
        type="button"
        onClick={handleEditClick}
      >
        {editMode ? "Save Article" : "Edit Article"}
      </Button>
    );
  } else {
    return (
      <></>
    )
  }
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
      {user ? (
        <>
          <NewArticleButton />
          <EditArticleButton />
          <NavProfile />
        </>
      ) : (
        <SigninButton />
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
