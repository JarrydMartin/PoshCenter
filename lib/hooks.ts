import { auth, firestore } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { UserData, UserModel } from "./models";
import { UserRoles } from "./enums";


// Custom hook to read  auth record and user profile doc
export function useUserData() {
    const [firebaseUser] = useAuthState(auth);

    const anonUser: UserModel = buildAnonUser();

    const [user, setUser] = useState<UserModel>(anonUser);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (firebaseUser) {
            const ref = firestore.collection("users").doc(firebaseUser.uid);
            unsubscribe = ref.onSnapshot((doc) => {
                let userData : UserModel;
                if (doc.exists) {
                    userData = doc.data() as UserModel
                    setUser(userData);
                } else {
                    const defaultUSerSetup: UserModel = {
                        name: firebaseUser.displayName,
                        uid: firebaseUser.uid,
                        profileImage: firebaseUser.photoURL,
                        role: UserRoles.READER,
                    };
                    doc.ref.set(defaultUSerSetup);
                    setUser(defaultUSerSetup);
                    userData = defaultUSerSetup
                }
                setCanEdit(
                    userData.role == UserRoles.EDITOR || userData.role == UserRoles.ADMIN
                );
                setIsSignedIn(userData.role != UserRoles.ANON);
            });
        } 
        return unsubscribe;
    }, [firebaseUser]);

    const userData: UserData = {
        user: user,
        canEdit: canEdit,
        isSignedIn: isSignedIn,
    };
    return userData;
}

function buildAnonUser() {
    const length = 5;
    var seed = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        seed += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const anonUser: UserModel = {
        name: "Anonymous",
        uid: "0000000000",
        profileImage: `https://avatars.dicebear.com/api/identicon/${seed}.svg`,
        role: UserRoles.ANON,
    };
    return anonUser;
}