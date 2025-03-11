import IClient from '@models/client';
import {LoginData} from "@contexts/AuthContext";
import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";
import {ApprovalStatus, Transaction} from "@models/transaction";
import {Option} from "@models/option";
import {guid} from '../helper-functions';


export const mockChildren: ChildAccount[] = [
    {_id: "2", username: 'child1', password: 'pass123', displayName: 'Child 1', parentId: "1", balance: 250, interest: 12},
    {_id: "123", username: 'child2', password: 'pass123', displayName: 'Child 2', parentId: "1", balance: 1150, interest: 12},
];
export const mockUsers: IUser[] = [
    {_id: "1", username: 'parent1', password: 'pass123', displayName: 'Parent One'},
    {_id: "2", username: 'child1', password: 'pass123', displayName: 'Child 1', isChildAccount: true},
    {_id: "123", username: 'child2', password: 'pass123', displayName: 'Child 2', isChildAccount: true}
];

export const mockRequests: Transaction[] = []

export default class MockClient implements IClient {

    async auth(userData: LoginData): Promise<IUser | ChildAccount | null> {
        const user = mockUsers.find(user => user.username === userData.username && user.password === userData.password);
        const child = mockChildren.find(child => child.username === userData.username && child.password === userData.password);
        return Promise.resolve({...user, ...child} as ChildAccount);
    }

    //User CRUD
    async getUser(userId:string): Promise<IUser | null> {
        const user = mockUsers.find(user => user._id === userId);
        return Promise.resolve(user || null);
    }

    getUsers(): Promise<IUser[]|null> {
        return Promise.resolve(mockUsers);
    }

    updateChildAccount(user: IUser): Promise<IUser|null>{
        const userIndex = mockUsers.findIndex(u => u._id === user._id);
        mockUsers[userIndex] = user;
        return Promise.resolve(user);
    }

    addUser(userData: IUser): Promise<IUser | void>{
        mockUsers.push(userData);
        return Promise.resolve(userData);
    }

    //Child CRUD
    async addChildUser(childData: ChildAccount): Promise<ChildAccount| null> {
        childData._id = guid();
        mockUsers.push(childData);
        mockChildren.push(childData);
        return Promise.resolve(childData);
    }

    getChildAccounts(parentId: string): Promise<ChildAccount[]|null> {
        return Promise.resolve(mockChildren.filter(child => child.parentId === parentId));
    }

    deleteChildAccount(childId: string): Promise<void> {
        const userIndex = mockUsers.findIndex(user => user._id === childId);
        mockUsers.splice(userIndex, 1);
        return Promise.resolve();
    }

    //Transaction CRUD
    getPendingRequestsForChild(userId: string, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            const child = mockChildren.find(child => child._id === userId);
            if (!child) reject(new Error(`User with id ${userId} not found`));
            if (child) resolve(mockRequests.filter(request => request.childId === child._id && request.approved !== ApprovalStatus.Rejected))
        });
    }

    getPendingRequestsForParent(parentUserId: string, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            const parent = mockUsers.find(user => user._id === parentUserId);
            if (!parent) reject(new Error(`User with id ${parentUserId} not found`));
            resolve(mockRequests.filter(request => mockChildren.filter(child => child.parentId === parentUserId).map(child => child._id).includes(request.childId)  && request.approved !== ApprovalStatus.Rejected));
        });
    }

    sendRequest(newRequest: Transaction, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            const child = mockChildren.find(child => child._id === newRequest.childId);
            if (child) {
                mockRequests.push(newRequest);
                resolve(mockRequests.filter(request => mockChildren.filter(child => newRequest.childId === child._id).map(child => child._id).includes(request.childId)));
            } else {
                reject(new Error('Child not found'))
            }
        });
    }

    approveRequest(transaction: Transaction, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            //Find the transaction in the mockRequests array
            const transactionIndex = mockRequests.findIndex(request => request._id === transaction._id);
            //If it's not found, reject
            if (transactionIndex === -1) reject(new Error(`Transaction with id ${transaction._id} not found`));
            const transactionToApprove = mockRequests[transactionIndex];
            transactionToApprove.approved = ApprovalStatus.Approved;
            //Return the updated mockRequests array
            const parentId = mockChildren.find(child => child._id === transaction.childId)?.parentId;
            resolve(mockRequests.filter(request => mockChildren.filter(child => child.parentId === parentId).map(child => child._id).includes(request.childId) && request.approved === ApprovalStatus.Pending));
        });
    }

    rejectRequest(transaction: Transaction, options?: Option): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            if (options?.error) reject(new Error(options.error));
            //Find the transaction in the mockRequests array
            const transactionIndex = mockRequests.findIndex(request => request._id === transaction._id);
            //If it's not found, reject
            if (transactionIndex === -1) reject(new Error(`Transaction with id ${transaction._id} not found`));
            //Otherwise remove it from the mockRequests array
            const transactionToReject = mockRequests[transactionIndex];
            transactionToReject.approved = ApprovalStatus.Rejected;
            //Return the updated mockRequests array
            const parentId = mockChildren.find(child => child._id === transaction.childId)?.parentId;
            resolve(mockRequests.filter(request => mockChildren.filter(child => child.parentId === parentId).map(child => child._id).includes(request.childId) && request.approved === ApprovalStatus.Pending));
        });
    }

    getChildAccount(childUserId: string): Promise<ChildAccount> {
        return new Promise((resolve, reject) => {
            const child = mockChildren.find(child => child._id === childUserId);
            if (child) resolve(child);
            else reject(new Error(`Child with id ${childUserId} not found`));
        });
    }

}

