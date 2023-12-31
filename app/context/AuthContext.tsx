'use client'
import React, {createContext, useState, ReactNode, useContext} from "react";
import { getMockUser } from '../models/mockData';

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
	const [userId, setUserId] = useState<string>("");

	const login = (userData: LoginData) => {
		let mockUser = getMockUser(userData);
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
