import {User, Child, Transaction} from './types';
import IClient from './client';
import {LoginData} from "../context/AuthContext";


export const mockChildren: Child[] = [
	{ id: "2", username: 'child1', password: 'pass123', displayName: 'Child 1 of Parent One', parentId:"1", balance: 250, interest: 12, pendingRequests:[] },
];
export const mockUsers: User[] = [
	{ id: "1", username: 'parent1', password: 'pass123', displayName: 'Parent One'},
	...mockChildren,
];

export default class MockClient implements IClient{
	constructor() {
	}
	getUser(userData: LoginData): User | null {
		const user = mockUsers.find(user => user.username === userData.username && user.password === userData.password);
		return user || null;
	}

	getUsers(): User[] {
		return mockUsers;
	}
	addChildUser(childData: Child){
		mockUsers.push(childData);
		mockChildren.push(childData);
	}

	addUser(userData: User){
		mockUsers.push(userData);
	}

	getChildAccounts(parentId: string): Child[] {
		return mockChildren.filter(child => child.parentId === parentId);
	}

	deleteChildAccount(childId: string){
		const userIndex = mockUsers.findIndex(user => user.id === childId);
		mockUsers.splice(userIndex, 1);
	}

	sendRequest(childId:string, newRequest: Transaction){
		const child = mockChildren.find(child => child.id === childId);
		if(child){
			child.pendingRequests.push(newRequest);
		}
	}
}


