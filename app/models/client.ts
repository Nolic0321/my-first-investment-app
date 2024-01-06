import {LoginData} from "../context/AuthContext";
import {Child, Option, Transaction, User} from "./types";
import MockClient from "./mockClient";

export default interface IClient {
    //User CRUD
    getUser(userData: LoginData, options?:Option): User | null;
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

export function create(environment: string):IClient{
    if(environment === "mock"){
        return new MockClient();
    } else {
        throw new Error("Invalid environment");
    }
}
