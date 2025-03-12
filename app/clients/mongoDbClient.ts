import IClient from "@models/client";
import {LoginData} from "@contexts/AuthContext";
import {Option} from "@models/option";
import {IUser} from "@models/user";
import {ChildAccount} from "@models/child-account";
import {ApprovalStatus, Transaction} from "@models/transaction";
import {DeleteResponse, UpdateOneResponse} from "@mongoDataApiHelper";

export default class MongoDbClient implements IClient {

    async auth(userData: LoginData, options?: Option | undefined): Promise<IUser | null> {
        try {
            return await this.post<IUser | ChildAccount>(`/api/auth`, userData);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getUser(userId: string, options?: Option | undefined): Promise<IUser | null> {
        try {
            return await this.get<IUser>(`/api/user/${userId}`);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getUsers(options?: Option | undefined): Promise<IUser[] | null> {
        try{
            return await this.get<IUser[]>(`/api/user`);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateChildAccount(user: IUser, options?: Option | undefined): Promise<ChildAccount|null> {
        try{
            const response = await this.patch<UpdateOneResponse>(`/api/childaccount/${user._id}`, user);
            if(response?.modifiedCount === 0) console.log('no user updated');
            return user as ChildAccount;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    addUser(userData: IUser, options?: Option | undefined): Promise<IUser|void> {
        try{
            const response = this.post<IUser>(`/api/user`, userData);
            if(!response) return Promise.resolve();
            return response as Promise<IUser>;
        }catch (e){
            console.log(e);
            return Promise.resolve();
        }
    }

    async addChildUser(childData: ChildAccount, options?: Option | undefined): Promise<ChildAccount | null> {
        try{
            return await this.post<ChildAccount>(`/api/childaccount`, childData);
        } catch(e){
            console.log(e);
            return null;
        }
    }

    async getChildAccounts(parentId: string, options?: Option | undefined): Promise<ChildAccount[]|null> {
        try{
            const url = `/api/parent/${parentId}/childaccount`;
            return await this.get<ChildAccount[]>(url);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getChildAccount(childUserId: string): Promise<ChildAccount> {
        try{
            const response = await this.get<ChildAccount>(`/api/childaccount/${childUserId}`);
            return response as ChildAccount;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteChildAccount(childId: string, options?: Option | undefined): Promise<void> {
        try{
            const response = await this.delete<DeleteResponse>(`/api/childaccount/${childId}`);
            if(response?.deletedCount === 0) console.log('no user deleted');
            return Promise.resolve();
        } catch (e) {
            console.log(e);
            return Promise.resolve();
        }
    }

    sendRequest(newRequest: Transaction, options?: Option | undefined): Promise<Transaction[]> {
            const response = this.post<Transaction[]>(`/api/childaccount/${newRequest.childId}/transactions`, newRequest);
            return response as Promise<Transaction[]>;
    }

    getPendingRequestsForChild(userId: string, options?: Option | undefined): Promise<Transaction[]> {
        const response = this.get<Transaction[]>(`/api/childaccount/${userId}/transactions`);
        return response as Promise<Transaction[]>;
    }

    getPendingRequestsForParent(parentUserId: string, options?: Option): Promise<Transaction[]> {
        const response = this.get<Transaction[]>(`/api/parent/${parentUserId}/transactions`);
        return response as Promise<Transaction[]>;
    }

    approveRequest(transaction: Transaction, options?: Option | undefined): Promise<Transaction[]> {
        const response = this.post<Transaction[]>(`/api/transactions/${transaction._id}/approve`, transaction);
        return response as Promise<Transaction[]>;
    }

    rejectRequest(transaction: Transaction, options?: Option | undefined): Promise<Transaction[]> {
        const response = this.post<Transaction[]>(`/api/transactions/${transaction._id}/deny`, transaction);
        return response as Promise<Transaction[]>;
    }

    adjustBalance(childUserId: string, adjustment: number, options?: Option | undefined): Promise<ChildAccount> {
        const transactionData: Transaction = {
            amount: adjustment,
            childId: childUserId,
            approved: ApprovalStatus.Approved,
            reason: 'Parent Balance Adjustment',
            date: new Date()
        }
        const response = this.post<ChildAccount>(`/api/parent/${childUserId}/adjustment`, transactionData);
        return response as Promise<ChildAccount>;
    }

    private async get<T>(url: string, body?: any, headers?: any):Promise<T | null> {
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

    private async post<T>(url: string, body?: any, headers?: any):Promise<T | null> {
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

    private async put<T>(url:string, body?:any, headers?:any): Promise<T | null>{
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

    private async patch<T>(url:string, body?:any, headers?:any):Promise<T | null>{
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

    private async delete<T>(url:string, body?:any, headers?:any):Promise<T | null>{
        try{
            const response = await fetch(url,{
                method: 'DELETE',
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
