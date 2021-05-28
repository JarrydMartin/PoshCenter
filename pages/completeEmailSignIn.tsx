import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { UserRoles } from "../lib/enums";
import { auth, firestore } from "../lib/firebase";
import { UserModel } from "../lib/models";
import { useRouter } from "next/router";

const completeEmailSignIn = () => {
    const [currentURL, setcurrentURL] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const { user } = router.query;

    useEffect(() => {
        setcurrentURL(window.location.href);
    }, []);

    const handleEmailConfirmation = async () => {
        if (user==='true') {
            try {
                await auth.signInWithEmailLink(email, currentURL);
                router.push('/profile');
            } catch (error) {
                setErrorMessage(`Error signing in, try again...${error.message}`);
            }
        } else {
            try {
                await auth.signInWithEmailLink(email, currentURL);
                const length = 5;
                var seed = "";
                var characters =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    seed += characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    );
                }
                const newUser: UserModel = {
                    uid: auth.currentUser.uid,
                    name: name,
                    profileImage: `https://avatars.dicebear.com/api/identicon/${seed}.svg`,
                    role: UserRoles.READER,
                    email: email,
                };
                await new Promise(resolve => setTimeout(resolve, 2000));
                await firestore
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .set(newUser);

                router.push('/profile');
            } catch (error) {
                setErrorMessage(`Error signing in, try again...${error.message}`);
            }
        }
    };

    const firstTime = (
        <>
            <h2>First Time Signing In</h2>
            <p>
                Since this is your first time signing in please provide us with
                your name and confirm your email.
            </p>
            <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br/>
            <br/>
            <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br/>
            <Button variant="contained" onClick={handleEmailConfirmation}>
                Confirm Email Address
            </Button>
        </>
    );

    const returningUser = (
        <>
            <h2>Welcome back</h2>
            <p>Please confirm your email.</p>
            <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br/>
            <Button variant="contained" onClick={handleEmailConfirmation}>
                Confirm Email Address
            </Button>
        </>
    );
    return (
        <Layout>
            <div>
                {user==='true' ? returningUser : firstTime}
                {errorMessage}
            </div>
        </Layout>
    );
};

export default completeEmailSignIn;
