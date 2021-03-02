import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";

const NavBar = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const NavProfile = () => {
    return <><Button onClick={() => auth.signOut()}>Sign Out</Button> <img src={user?.photoURL} /></>;
  };
  const SigninButton = () => {
    return (
      <Button className="btn-google" onClick={signInWithGoogle}>
        Sign in
      </Button>
    );
  };

  const { user } = useContext(UserContext);
  return <div>{user ? <NavProfile /> : <SigninButton />}</div>;
};

export default NavBar;
