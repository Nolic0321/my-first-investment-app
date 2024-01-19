import {LoginData} from "@contexts/AuthContext";
import {Option} from "@models/option";
import {ChildAccount} from "@models/child-account";
import {Transaction} from "@models/transaction";
import {IUser} from "@models/user";

export default interface IClient {
    auth(userData: LoginData, options?:Option): Promise<IUser | null>;

    //User CRUD
    getUser(userId: string, options?:Option): Promise<IUser | null>;
    getUsers(options?:Option): Promise<IUser[]|null>;
    updateUser(child: IUser, options?:Option): Promise<IUser | null>;
    addUser(userData: IUser, options?:Option): Promise<void>;

    //Child CRUD
    addChildUser(childData: ChildAccount, options?:Option): Promise<ChildAccount | null>;
    deleteChildAccount(childId: string, options?:Option): Promise<void>;
    getChildAccount(childUserId: string): Promise<ChildAccount>;
    getChildAccounts(parentId: string, options?:Option): Promise<ChildAccount[]|null>;

    //Transaction CRUD
    sendRequest(newRequest: Transaction, options?:Option): Promise<Transaction[]>;
    getPendingRequests(userId: string, options?:Option): Promise<Transaction[]>;
    approveRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;
    rejectRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;

}
