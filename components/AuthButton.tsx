import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../lib/contexts";
import { auth, googleAuthProvider,firestore } from "../lib/firebase";
import EmailLinkSignIn from "./EmailLinkSignIn";

const AuthButton = () => {
    const { isSignedIn } = useContext(UserContext);

    return <div>{isSignedIn ? <SignOutButton /> : <SignInButton />}</div>;
};

// Sign in with Google button
function SignInButton() {
    const handleSendLink = async (email: string) => {
        const userRef = await firestore.collection('users').where('email' , '==', email).get();

        if(userRef.empty){
            var actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: "https://hsnet.nz/completeEmailSignIn?user=false",
                // This must be true.
                handleCodeInApp: true
            };
            await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        } else {
            var actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: "http://localhost:3000/completeEmailSignIn?user=true",
                // This must be true.
                handleCodeInApp: true
            };
            await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        }
    };

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <>
            <Button
                variant="contained"
                className="btn-google"
                onClick={signInWithGoogle}>
                Sign In With Google
            </Button>
            <EmailLinkSignIn handleSendLink={handleSendLink} />
        </>
    );
}

// Sign out button
function SignOutButton() {
    return (
        <Button
            onClick={async () => {
                await auth.signOut();
                window.location.reload(false);
            }}>
            Sign Out
        </Button>
    );
}

export default AuthButton;
