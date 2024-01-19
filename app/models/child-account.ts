import {IUser} from "@models/user";
import mongoose from "mongoose";

export interface ChildAccount extends IUser{
    parentId: string;
    balance: number;
    interest: number;
}

const ChildAccountSchema = new mongoose.Schema<ChildAccount>({
    _id: String,
    username: String,
    password: String,
    displayName: String,
    parentId: String,
    balance: Number,
    interest: Number
});

export const ChildAccount = mongoose.model("ChildAccount", ChildAccountSchema);
