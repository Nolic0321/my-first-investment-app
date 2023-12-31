// mockData.ts

import { User } from './types';
import {LoginData} from "../context/AuthContext";

export const mockUsers: User[] = [
	{ id: "1", username: 'parent1', password: 'pass123', displayName: 'Parent One'},
	{ id: "2", username: 'child1', password: 'pass123', displayName: 'Child 1 of Parent One', parentId:"1", balance: 100 },
];

export function getMockUser(userData: LoginData): User | null {
	const user = mockUsers.find(user => user.username === userData.username && user.password === userData.password);
	return user || null;
}
