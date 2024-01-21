import IClient from "@models/client";
import {LoginData} from "@contexts/AuthContext";
import {Option} from "@models/option";
import {IUser} from "@models/user";
import {ChildAccount} from "@models/child-account";
import {Transaction} from "@models/transaction";

export default class MongoDbClient implements IClient {
    constructor() {
        console.log('creating mongo client')
    }

    async auth(userData: LoginData, options?: Option | undefined): Promise<IUser | null> {
        try {
            const response = await this.post(`/api/auth`, userData);
            return {...response, userId: response._id} as IUser;
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
            return response as IUser[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateUser(user: IUser, options?: Option | undefined): Promise<IUser|null> {
        try{
            const response = await this.patch(`/api/user/${user._id}`, user);
            return response as IUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    addUser(userData: IUser, options?: Option | undefined): Promise<void> {
        try{
            const response = this.post(`/api/user`, userData);
            return response as Promise<void>;
        }catch (e){
            console.log(e);
            return Promise.resolve();
        }
    }

    async addChildUser(childData: ChildAccount, options?: Option | undefined): Promise<ChildAccount | null> {
        try{
            const response = await this.post(`/api/childaccount`, childData);
            return response as ChildAccount;
        } catch(e){
            console.log(e);
            return null;
        }
    }

    async getChildAccounts(parentId: string, options?: Option | undefined): Promise<ChildAccount[]|null> {
        try{
            const response = await this.get(`/api/parent/childaccount/${parentId}`);
            return response as ChildAccount[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getChildAccount(childUserId: string): Promise<ChildAccount> {
        throw new Error("Method not implemented.");
    }

    async deleteChildAccount(childId: string, options?: Option | undefined): Promise<void> {
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
            console.log(`fetching GET ${url}`);
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

    private async put(url:string, body?:any, headers?:any){
        try{
            const response = await fetch(url,{
                method: 'PUT',
                body: JSON.stringify(body),
                headers: headers
            });
            return await response.json();
        }catch (e){
            console.log(e);
            return null;
        }
    }

    private async patch(url:string, body?:any, headers?:any){
        try{
            const response = await fetch(url,{
                method: 'PUT',
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
