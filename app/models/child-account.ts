import {IUser} from "@models/user";

export interface ChildAccount extends IUser{
    parentId: string;
    balance: number;
    interest: number;
}
