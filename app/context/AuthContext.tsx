'use client'
import React, {createContext, useState, ReactNode, useContext} from "react";
import {ClientContext} from "./ClientContext";
import IClient from "../models/client";

export interface LoginData {
    username: string,
    password: string
}

export const useAuth = () => useContext(AuthContext);
export const AuthContext = createContext<{
    userId: string;
    login: (userData: LoginData) => boolean;
    logout: () => void;
} | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({children}) => {
    console.log(`AuthProvider: creating auth context`);
	const [userId, setUserId] = useState<string>("");
    const clientContext = useContext(ClientContext);
    console.log(`AuthProvider: clientContext: ${clientContext}`)
    if (!clientContext) {
        return <div>Loading auth...</div>;	//Loader?
    }
    const client = clientContext as unknown as IClient

    if(!client) return <div>AuthContext: Loading client...</div>

    const login = (userData: LoginData) => {
        let mockUser = client.getUser(userData);
        if (mockUser) {
            setUserId(mockUser.id);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUserId("");
    };

    return (
        <AuthContext.Provider value={{userId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
});
AuthProvider.displayName = "AuthProvider";
