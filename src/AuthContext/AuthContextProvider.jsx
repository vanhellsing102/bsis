"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
    const logoutUser = () =>{
        return signOut(auth);
    }
    useEffect(() =>{
        const usSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setLoading(false);
            setUser(currentUser);
            console.log("currentUser", currentUser);
        })
        return () =>{
            return usSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        loginUser,
        logoutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;