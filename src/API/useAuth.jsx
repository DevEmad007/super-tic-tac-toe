import { getAuth,onAuthStateChanged,signInWithPopup,GoogleAuthProvider,signOut } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

const useAuth = () => {
    const auth = getAuth();
    const [ user,setUser ] = useState(null);
    const [ userUID,setUserUID ] = useState(null);

    const checkUser = () => {
        onAuthStateChanged(auth,(user) => {
            if (user !== null) {
                //user signed in
                setUserUID(user?.uid);
                setUser(user);
            } else {
                setUser(null);
                setUserUID(null);
                // User is signed out
            }
        });
    };

    useEffect(() => {
        checkUser();
    },[ user ]);

    const authWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const handleLogOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            setUserUID(null);
        }).catch((error) => {
            // An error happened.
        });
    };

    return { authWithGoogle,user,userUID,handleLogOut };
};



export default useAuth;
