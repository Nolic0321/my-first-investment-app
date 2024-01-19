import mongoose from "mongoose";
import {IUser} from "@models/IUser";

export interface ParentAccount extends IUser{}

const ParentAccountSchema = new mongoose.Schema<ParentAccount>({
    id: String,
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.Parent || mongoose.model<ParentAccount>("ParentAccount", ParentAccountSchema);
