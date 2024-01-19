import IClient from '@models/client';
import {LoginData} from "@contexts/AuthContext";
import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";
import {Transaction} from "@models/transaction";
import {Option} from "@models/option";


export const mockChildren: ChildAccount[] = [
    {id: "2", username: 'child1', password: 'pass123', displayName: 'Child 1', parentId: "1", balance: 250, interest: 12},
    {id: "123", username: 'child2', password: 'pass123', displayName: 'Child 2', parentId: "1", balance: 1150, interest: 12},
];
export const mockUsers: IUser[] = [
    {id: "1", username: 'parent1', password: 'pass123', displayName: 'Parent One'},
    ...mockChildren,
];

export const mockRequests: Transaction[] = []

export default class MockClient implements IClient {
    constructor() {
    }

    async auth(userData: LoginData): Promise<IUser | null> {
        const user = mockUsers.find(user => user.username === userData.username && user.password === userData.password);
        return Promise.resolve(user || null);
    }

    //User CRUD
    async getUser(userId:string): Promise<IUser | null> {
        const user = mockUsers.find(user => user.id === userId);
        return Promise.resolve(user || null);
    }

    getUsers(): Promise<IUser[]|null> {
        return Promise.resolve(mockUsers);
    }

    updateUser(user: IUser): Promise<IUser|null>{
        const userIndex = mockUsers.findIndex(u => u.id === user.id);
        mockUsers[userIndex] = user;
        return Promise.resolve(user);
    }

    addUser(userData: IUser): Promise<void>{
        mockUsers.push(userData);
        return Promise.resolve();
    }

    //Child CRUD
    async addChildUser(childData: ChildAccount): Promise<ChildAccount| null> {
        mockUsers.push(childData);
        mockChildren.push(childData);
        return Promise.resolve(childData);
    }

    getChildAccounts(parentId: string): Promise<ChildAccount[]|null> {
        return Promise.resolve(mockChildren.filter(child => child.parentId === parentId));
    }

    deleteChildAccount(childId: string): Promise<void> {
        const userIndex = mockUsers.findIndex(user => user.id === childId);
        mockUsers.splice(userIndex, 1);
        return Promise.resolve();
    }

    //Transaction CRUD
    getPendingRequests(userId: string, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            const child = mockChildren.find(child => child.id === userId);
            const parent = mockUsers.find(user => user.id === userId);
            if (!child && !parent) reject(new Error(`User with id ${userId} not found`));
            if (child) resolve(mockRequests.filter(request => request.childId === child.id))
            if (parent) resolve(mockRequests.filter(request => mockChildren.filter(child => child.parentId === userId).map(child => child.id).includes(request.childId)));
        });
    }

    sendRequest(newRequest: Transaction, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            const child = mockChildren.find(child => child.id === newRequest.childId);
            if (child) {
                mockRequests.push(newRequest);
                resolve(mockRequests.filter(request => mockChildren.filter(child => newRequest.childId === child.id).map(child => child.id).includes(request.childId)));
            } else {
                reject(new Error('Child not found'))
            }
        });
    }

    approveRequest(transaction: Transaction, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            //Find the transaction in the mockRequests array
            const transactionIndex = mockRequests.findIndex(request => request.id === transaction.id);
            //If it's not found, reject
            if (transactionIndex === -1) reject(new Error(`Transaction with id ${transaction.id} not found`));
            //Otherwise remove it from the mockRequests array
            mockRequests.splice(transactionIndex, 1);
            //Return the updated mockRequests array
            const parentId = mockChildren.find(child => child.id === transaction.childId)?.parentId;
            resolve(mockRequests.filter(request => mockChildren.filter(child => child.parentId === parentId).map(child => child.id).includes(request.childId)));
        });
    }

    rejectRequest(transaction: Transaction, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            //Find the transaction in the mockRequests array
            const transactionIndex = mockRequests.findIndex(request => request.id === transaction.id);
            //If it's not found, reject
            if (transactionIndex === -1) reject(new Error(`Transaction with id ${transaction.id} not found`));
            //Otherwise remove it from the mockRequests array
            mockRequests.splice(transactionIndex, 1);
            //Return the updated mockRequests array
            const parentId = mockChildren.find(child => child.id === transaction.childId)?.parentId;
            resolve(mockRequests.filter(request => mockChildren.filter(child => child.parentId === parentId).map(child => child.id).includes(request.childId)));
        });
    }

    getChildAccount(childUserId: string): Promise<ChildAccount> {
        return new Promise((resolve, reject) => {
            const child = mockChildren.find(child => child.id === childUserId);
            if (child) resolve(child);
            else reject(new Error(`Child with id ${childUserId} not found`));
        });
    }

}

