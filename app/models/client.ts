import {LoginData} from "../context/AuthContext";
import {Child, Transaction, User} from "./types";
import MockClient from "./mockClient";

export default interface IClient {
    getUser(userData: LoginData): User | null;
    getUsers(): User[];
    addChildUser(childData: Child): void;
    addUser(userData: User): void;
    getChildAccounts(parentId: string): Child[];
    deleteChildAccount(childId: string): void;
    sendRequest(childId:string, newRequest: Transaction): void;
}

export function create(environment: string):IClient{
    if(environment === "mock"){
        console.log(`Factory creating mock client`)
        return new MockClient();
    } else {
        throw new Error("Invalid environment");
    }
}
