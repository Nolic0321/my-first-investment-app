import {User} from "@models/User";
import mongoose from "mongoose";

export interface Child extends User{
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
