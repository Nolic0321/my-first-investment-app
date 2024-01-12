import IClient from "./clientFactory";
import {LoginData} from "@contexts/AuthContext";
import {Option} from "@models/types";
import {User} from "@models/User";
import {Child} from "@models/Child";
import {Transaction} from "@models/Transaction";

export default class MongoDbClient implements IClient {
    async getUser(userData: LoginData, options?: Option | undefined): Promise<User | null> {
        try{
            const response = await fetch('/api/user', {method:'GET', body: JSON.stringify(userData)});
            return await response.json() as User;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    getUsers(options?: Option | undefined): User[] {
        throw new Error("Method not implemented.");
    }

    updateUser(child: Child, options?: Option | undefined): void {
        throw new Error("Method not implemented.");
    }

    addUser(userData: User, options?: Option | undefined): void {
        throw new Error("Method not implemented.");
    }

    addChildUser(childData: Child, options?: Option | undefined): void {
        throw new Error("Method not implemented.");
    }

    getChildAccounts(parentId: string, options?: Option | undefined): Child[] {
        throw new Error("Method not implemented.");
    }

    deleteChildAccount(childId: string, options?: Option | undefined): void {
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
}
