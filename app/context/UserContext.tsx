'use client'
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { User } from '@models/User';
import { mockUsers } from '../clients/mockClient';
import {AuthContext} from "./AuthContext";

export const UserContext = createContext<{
	user: User | null;
	updateUser: (user: User) => void;
}>({ user: null, updateUser: () => {} });

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = React.memo(({ children }) => {
	const { userId } = useContext(AuthContext) || {userId: ""};
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (userId) {
			const fetchedUser = mockUsers.find((user) => user.id === userId) as User;
			setUser(fetchedUser);
		}else{
			setUser(null);
		}
	}, [userId]);

	const updateUser = (updatedUser: User) => {
		setUser(updatedUser);
	};

	return (
		<UserContext.Provider value={{user, updateUser}}>
			{children}
		</UserContext.Provider>
	);
});
