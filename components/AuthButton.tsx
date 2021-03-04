import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider } from "../lib/firebase";

const AuthButton = () => {
  const user  = useContext(UserContext);
  return <div>{user ? <SignOutButton /> : <SignInButton />}</div>;
};

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <Button className="btn-google" onClick={signInWithGoogle}>
      Sign in
    </Button>
  );
}

// Sign out button
function SignOutButton() {
  return <Button onClick={() => auth.signOut()}>Sign Out</Button>;
}

export default AuthButton;
