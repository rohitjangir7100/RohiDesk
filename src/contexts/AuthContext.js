import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    /*  undefined = auth still checking | null = signed‑out | object = signed‑in  */
    const [currentUser, setCurrentUser] = useState(undefined);
    

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => setCurrentUser(user ?? null));
    }, []);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
