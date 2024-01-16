import {IUser} from "@models/IUser";
import mongoose from "mongoose";

export interface Child extends IUser{
    parentId: string;
    balance: number;
    interest: number;
}

const ChildSchema = new mongoose.Schema<Child>({
    id: String,
    username: String,
    password: String,
    displayName: String,
    parentId: String,
    balance: Number,
    interest: Number
});

export default mongoose.models.Child || mongoose.model<Child>("Child", ChildSchema);
