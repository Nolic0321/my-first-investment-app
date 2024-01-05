'use client'
import React, {createContext, useState, ReactNode, useContext} from "react";
import {ClientContext} from "./ClientContext";
import IClient from "../models/client";

export interface LoginData{
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const {client} = useContext(ClientContext) as unknown as {client: IClient};
	const [userId, setUserId] = useState<string>("");

	const login = (userData: LoginData) => {
		let mockUser = client.getUser(userData);
		if(mockUser) {
			setUserId(mockUser.id);
			return true;
		}
		return false;
	};

	const logout = () => {
		setUserId("");
	};

	return (
		<AuthContext.Provider value={{ userId, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
