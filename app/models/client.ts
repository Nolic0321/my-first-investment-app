import {LoginData} from "../context/AuthContext";
import {Child, Transaction, User} from "./types";

export default interface IClient {
    getUser(userData: LoginData): User | null;
    addChildUser(childData: Child): void;
    addUser(userData: User): void;
    getChildAccounts(parentId: string): Child[];
    deleteChildAccount(childId: string): void;
    sendRequest(childId:string, newRequest: Transaction): void;
}

export function create(environment: string){
    if(environment === "mock"){
        const {default: MockClient} = require("./mockClient");
        return new MockClient();
    } else {
        throw new Error("Invalid environment");
    }
}
