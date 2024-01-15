'use client'
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { User } from '@models/User';
import { mockUsers } from '../clients/mockClient';
import {AuthContext} from "./AuthContext";
import {ClientContext} from "@contexts/ClientContext";

export const UserContext = createContext<{
	currentUser: User | null;
	updateUser: (user: User) => void;
}>({ currentUser: null, updateUser: () => {} });

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = React.memo(({ children }) => {
	const { userId, user } = useContext(AuthContext) || {userId: ""};
	const client = useContext(ClientContext)!;
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		console.log('UserProvider: useEffect')
		if(!client) return;

		console.log('UserProvider: useEffect - client exists')
		if (user){
			console.log('UserProvider: useEffect - user exists')
			setCurrentUser(user);
		}else if (userId) {
			console.log('UserProvider: useEffect - userid exists')
			client.getUser(userId)
				.then((fetchedUser) => {setCurrentUser(fetchedUser)});
		}
		else{
			console.log('UserProvider: useEffect - user null')
			setCurrentUser(null);
		}
	}, [userId, client, user]);

	const updateUser = (updatedUser: User) => {
		setCurrentUser(updatedUser);
	};

	return (
		<UserContext.Provider value={{currentUser, updateUser}}>
			{children}
		</UserContext.Provider>
	);
});

UserProvider.displayName = "UserProvider";
