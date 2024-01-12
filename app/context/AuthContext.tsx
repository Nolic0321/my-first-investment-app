'use client'
import React, {createContext, useState, ReactNode, useContext, useEffect} from "react";
import {ClientContext} from "./ClientContext";
import IClient from "../clients/clientFactory";

export interface LoginData {
    username: string,
    password: string
}

export const useAuth = () => useContext(AuthContext);
export const AuthContext = createContext<{
    userId: string|null;
    login: (userData: LoginData) => Promise<boolean>;
    logout: () => void;
} | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({children}) => {
	const [userId, setUserId] = useState<string|null>("");
    const clientContext = useContext(ClientContext);

    // Check localStorage for userId
    useEffect(()=>{
        const storedUserId = localStorage.getItem("userId");
        if(storedUserId) setUserId(storedUserId);
    },[]);

    const client = clientContext as unknown as IClient


    const login = async (userData: LoginData) => {
        let user = await client.getUser(userData);
        if (user) {
            setUserId(user.id);
            localStorage.setItem("userId", user.id);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem("userId");
    };
    return (
        <AuthContext.Provider value={{userId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
});
AuthProvider.displayName = "AuthProvider";
