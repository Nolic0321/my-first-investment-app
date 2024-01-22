import {IUser} from "@models/user";
import mongoose from "mongoose";

export interface ChildAccount extends IUser{
    parentId: string;
    balance: number;
    interest: number;
}
