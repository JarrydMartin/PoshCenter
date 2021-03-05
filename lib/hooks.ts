import { auth, firestore } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useEffect, useState } from "react";
import { GetArticleTypes } from "./dataAccess";
import { UserModel } from "./models";
import { UserRoles } from "./enums";
import { UserContext } from "./contexts";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
    const [firebaseUser] = useAuthState(auth);

    const [user1, setUser] = useState<UserModel>(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (firebaseUser) {
            const ref = firestore.collection("users").doc(firebaseUser.uid);
            unsubscribe = ref.onSnapshot((doc) => {
                if (doc.exists) {
                  setUser(doc.data() as UserModel)
                } else {
                    const defaultUSerSetup: UserModel = {
                        name: firebaseUser.displayName,
                        uid: firebaseUser.uid,
                        profileImage: firebaseUser.photoURL,
                        role: UserRoles.READER,
                    };
                    doc.ref.set(defaultUSerSetup)
                    setUser(defaultUSerSetup);
                }
            });
        } else {
            const length = 5;
            var seed           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                seed += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            const anonUser: UserModel = {
                name: "Anonymous",
                uid: "0000000000",
                profileImage: `https://avatars.dicebear.com/api/identicon/${seed}.svg`,
                role: UserRoles.ANON,
            };
            setUser(anonUser);
        }

        return unsubscribe;
    }, [firebaseUser]);
    return user1;
}


export function useUser() {
  const user = useContext(UserContext);
  const canEdit = (user?.role == UserRoles.EDITOR) || (user?.role == UserRoles.ADMIN);
  const isSignedIn = (user?.role != UserRoles.ANON)
  
  return {user, canEdit, isSignedIn};
}