import mongoose from "mongoose";
import {IUser} from "@models/IUser";

export interface Parent extends IUser{}

const ParentSchema = new mongoose.Schema<Parent>({
    id: String,
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.Parent || mongoose.model<Parent>("Parent", ParentSchema);
