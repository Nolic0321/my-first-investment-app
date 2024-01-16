import IClient from "./clientFactory";
import {LoginData} from "@contexts/AuthContext";
import {Option} from "@models/types";
import {IUser} from "@models/IUser";
import {Child} from "@models/Child";
import {Transaction} from "@models/Transaction";

export default class MongoDbClient implements IClient {
    async auth(userData: LoginData, options?: Option | undefined): Promise<IUser | null> {
        try {
            const response = await this.post(`/api/auth`, userData);
            return {...response, id: response._id} as IUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getUser(userId: string, options?: Option | undefined): Promise<IUser | null> {
        try {
            const response = await this.get(`/api/user/${userId}`);
            return await response as IUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getUsers(options?: Option | undefined): Promise<IUser[] | null> {
        try{
            const response = await this.get(`/api/user`);
            return await response as IUser[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    updateUser(child: Child, options?: Option | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

    addUser(userData: IUser, options?: Option | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

    addChildUser(childData: Child, options?: Option | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getChildAccounts(parentId: string, options?: Option | undefined): Promise<Child[]|null> {
        throw new Error("Method not implemented.");
    }

    getChildAccount(childUserId: string): Promise<Child> {
        throw new Error("Method not implemented.");
    }

    deleteChildAccount(childId: string, options?: Option | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

    sendRequest(newRequest: Transaction, options?: Option | undefined): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    getPendingRequests(userId: string, options?: Option | undefined): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    approveRequest(transaction: Transaction, options?: Option | undefined): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    rejectRequest(transaction: Transaction, options?: Option | undefined): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    private async get(url: string, body?: any, headers?: any) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                body: JSON.stringify(body),
                headers: headers
            });
            return await response.json();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    private async post(url: string, body?: any, headers?: any) {
        try{
            const response = await fetch(url,{
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            });
            return await response.json();
        }catch (e){
            console.log(e);
            return null;
        }
    }
}
