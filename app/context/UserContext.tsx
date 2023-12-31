'use client'
import React, {createContext, ReactNode, useContext} from "react";
import { User } from '../models/types';
import { mockUsers } from '../models/mockClient';
import {AuthContext} from "./AuthContext";

export const UserContext = createContext<User | null>(null);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const { userId } = useContext(AuthContext) || {userId: ""};
	const user = userId ? mockUsers.find((user) => user.id === userId) as User : null;

	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};
