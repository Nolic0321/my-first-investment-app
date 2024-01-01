'use client'
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { User } from '../models/types';
import { mockUsers } from '../models/mockClient';
import {AuthContext} from "./AuthContext";

export const UserContext = createContext<{
	user: User | null;
	updateUser: (user: User) => void;
}>({ user: null, updateUser: () => {} });

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const { userId } = useContext(AuthContext) || {userId: ""};
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchedUser = userId ? mockUsers.find((user) => user.id === userId) as User : null;
		setUser(fetchedUser);
	}, [userId]);

	const updateUser = (updatedUser: User) => {
		setUser(updatedUser);
	};
	return (
		<UserContext.Provider value={{user, updateUser}}>
			{children}
		</UserContext.Provider>
	);
};
