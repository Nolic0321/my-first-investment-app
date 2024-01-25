'use client'    //TODO: Update to server side
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ClientContext} from "./ClientContext";
import {IUser} from "@models/user";
import {ChildAccount} from "@models/child-account";

export interface LoginData {
    username: string,
    password: string
}

export const useAuth = () => useContext(AuthContext);
export const AuthContext = createContext<{
    login: (userData: LoginData) => Promise<boolean>;
    logout: () => void;
    user: IUser | ChildAccount | null;
} | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({children}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const clientContext = useContext(ClientContext)!;

    // Check localStorage for userId
    useEffect(()=>{
        if(!clientContext) return;
        const storedUserId = localStorage.getItem("userId");
        if(storedUserId) {
            clientContext.getUser(storedUserId)
                .then((user) => {
                    if(user) {
                        setUser(user);
                    }
                });
        };
    },[clientContext]);

    const login = async (userData: LoginData) => {
        const user = await clientContext.auth(userData);
        if(!user || !user._id) return false;
        setUser(user);
        localStorage.setItem("userId", user._id);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userId");
    };
    return (
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    );
});
AuthProvider.displayName = "AuthProvider";
