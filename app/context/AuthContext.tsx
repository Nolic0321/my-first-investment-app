'use client'
import React, {createContext, useState, ReactNode, useContext, useEffect} from "react";
import {ClientContext} from "./ClientContext";
import {IUser} from "@models/user";

export interface LoginData {
    username: string,
    password: string
}

export const useAuth = () => useContext(AuthContext);
export const AuthContext = createContext<{
    userId: string|null;
    login: (userData: LoginData) => Promise<boolean>;
    logout: () => void;
    user: IUser | null;
} | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({children}) => {
	const [userId, setUserId] = useState<string|null>("");
    const [user, setUser] = useState<IUser | null>(null);
    const clientContext = useContext(ClientContext);

    // Check localStorage for userId
    useEffect(()=>{
        const storedUserId = localStorage.getItem("userId");
        if(storedUserId) setUserId(storedUserId);
    },[]);

    const login = async (userData: LoginData) => {
        const user = await clientContext.auth(userData);
        if(!user) return false;
        setUserId(user.id);
        setUser(user);
        localStorage.setItem("userId", user.id);
        return true;
    };

    const logout = () => {
        setUserId(null);
        setUser(null);
        localStorage.removeItem("userId");
    };
    return (
        <AuthContext.Provider value={{userId, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    );
});
AuthProvider.displayName = "AuthProvider";
