import { auth, firestore } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { GetArticleTypes } from "./dataAccess";
import { UserModel } from "./models";
import { UserRoles } from "./enums";

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
                  console.log(doc.data())
                  setUser(doc.data() as UserModel)
                } else {
                    const defaultUSerSetup: UserModel = {
                        name: firebaseUser.displayName,
                        uid: firebaseUser.uid,
                        profileImage: firebaseUser.photoURL,
                        role: UserRoles.READER,
                    };
                    console.log("doc doesnt exist")
                    doc.ref.set(defaultUSerSetup)
                    setUser(defaultUSerSetup);
                }
            });
        } else {
            setUser(null);
        }

        return unsubscribe;
    }, [firebaseUser]);
    return user1;
}
