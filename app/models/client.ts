import {LoginData} from "../context/AuthContext";
import {Child, Option, Transaction, User} from "./types";
import MockClient from "./mockClient";

export default interface IClient {
    getUser(userData: LoginData, options?:Option): User | null;
    getUsers(options?:Option): User[];
    addChildUser(childData: Child, options?:Option): void;
    addUser(userData: User, options?:Option): void;
    getChildAccounts(parentId: string, options?:Option): Child[];
    deleteChildAccount(childId: string, options?:Option): void;
    sendRequest(childId:string, newRequest: Transaction, options?:Option): Promise<Child>;
    updateUser(child: Child, options?:Option): void;
}

export function create(environment: string):IClient{
    if(environment === "mock"){
        return new MockClient();
    } else {
        throw new Error("Invalid environment");
    }
}
