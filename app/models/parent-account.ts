import mongoose from "mongoose";
import {IUser} from "@models/user";

export interface ParentAccount extends IUser{}

const ParentAccountSchema = new mongoose.Schema<ParentAccount>({
    _id: String,
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.Parent || mongoose.model<ParentAccount>("ParentAccount", ParentAccountSchema);
