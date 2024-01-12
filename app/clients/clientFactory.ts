import {LoginData} from "@contexts/AuthContext";
import MockClient from "./mockClient";
import MongoDbClient from "./mongoDbClient";
import {Option} from "@models/types";
import {User} from "@models/User";
import {Child} from "@models/Child";
import {Transaction} from "@models/Transaction";
import {ClientType} from "../enums/clientType";


export default interface IClient {
    //User CRUD
    getUser(userData: LoginData, options?:Option): Promise<User | null>;
    getUsers(options?:Option): User[];
    updateUser(child: Child, options?:Option): void;
    addUser(userData: User, options?:Option): void;

    //Child CRUD
    addChildUser(childData: Child, options?:Option): void;
    getChildAccounts(parentId: string, options?:Option): Child[];
    deleteChildAccount(childId: string, options?:Option): void;

    //Transaction CRUD
    sendRequest(newRequest: Transaction, options?:Option): Promise<Transaction[]>;
    getPendingRequests(userId: string, options?:Option): Promise<Transaction[]>;
    approveRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;
    rejectRequest(transaction: Transaction, options?:Option): Promise<Transaction[]>;

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
