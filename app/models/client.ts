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
    addUser(userData: IUser, options?:Option): Promise<IUser | void>;

    //Child CRUD
    addChildUser(childData: ChildAccount, options?:Option): Promise<ChildAccount | null>;
    updateChildAccount(child: IUser, options?:Option): Promise<IUser | null>;
    deleteChildAccount(childId: string, options?:Option): Promise<void>;
    getChildAccount(childUserId: string): Promise<ChildAccount>;
    getChildAccounts(parentId: string, options?:Option): Promise<ChildAccount[]|null>;

    //Transaction CRUD
    sendRequest(newRequest: Transaction, options?:Option): Promise<Transaction[]>;
    getPendingRequestsForChild(childUserId: string, options?:Option): Promise<Transaction[]>;
    getPendingRequestsForParent(parentUserId: string, options?:Option): Promise<Transaction[]>;
    approveRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;
    rejectRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;

}
