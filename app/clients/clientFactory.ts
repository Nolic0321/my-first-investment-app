import {LoginData} from "@contexts/AuthContext";
import MockClient from "./mockClient";
import MongoDbClient from "./mongoDbClient";
import {Option} from "@models/types";
import {IUser} from "@models/IUser";
import {Child} from "@models/Child";
import {Transaction} from "@models/Transaction";
import {ClientType} from "../enums/clientType";


export default interface IClient {
    auth(userData: LoginData, options?:Option): Promise<IUser | null>;
    //User CRUD
    getUser(userId: string, options?:Option): Promise<IUser | null>;
    getUsers(options?:Option): Promise<IUser[]|null>;
    updateUser(child: Child, options?:Option): Promise<void>;
    addUser(userData: IUser, options?:Option): Promise<void>;

    //Child CRUD
    addChildUser(childData: Child, options?:Option): Promise<void>;
    getChildAccounts(parentId: string, options?:Option): Promise<Child[]|null>;
    deleteChildAccount(childId: string, options?:Option): Promise<void>;

    //Transaction CRUD
    sendRequest(newRequest: Transaction, options?:Option): Promise<Transaction[]>;
    getPendingRequests(userId: string, options?:Option): Promise<Transaction[]>;
    approveRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;
    rejectRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;

    getChildAccount(childUserId: string): Promise<Child>;
}

export function GetClient(clientType:ClientType):IClient|null{
    switch(clientType){
        case ClientType.Mock:
            return new MockClient();
        case ClientType.Mongo:
            return new MongoDbClient();
        default:
            return null;
    }
}
