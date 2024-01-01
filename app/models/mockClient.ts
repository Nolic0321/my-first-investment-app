import { User, Child } from './types';
import {LoginData} from "../context/AuthContext";


export const mockChildren: Child[] = [
	{ id: "2", username: 'child1', password: 'pass123', displayName: 'Child 1 of Parent One', parentId:"1", balance: 100, interest: 0.3 },
];
export const mockUsers: User[] = [
	{ id: "1", username: 'parent1', password: 'pass123', displayName: 'Parent One'},
	...mockChildren,
];

export function getMockUser(userData: LoginData): User | null {
	const user = mockUsers.find(user => user.username === userData.username && user.password === userData.password);
	return user || null;
}

export function addUser(childData: User){
	mockUsers.push(childData);
}

export function getChildAccounts(parentId: string): Child[] {
	return mockChildren.filter(child => child.parentId === parentId);
}

export function deleteChildAccount(childId: string){
	const userIndex = mockUsers.findIndex(user => user.id === childId);
	mockUsers.splice(userIndex, 1);
}
