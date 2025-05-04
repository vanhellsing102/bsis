"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/firebase/firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext(null);

export const getAuthContext = () =>{
    return useContext(AuthContext);
}

const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() =>{
        const usSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setLoading(false);
            setUser(currentUser);
            console.log(currentUser);
        })
        return () =>{
            return usSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        loginUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;