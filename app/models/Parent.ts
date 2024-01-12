import mongoose from "mongoose";
import {User} from "@models/User";

export interface Parent extends User{}

const ParentSchema = new mongoose.Schema<Parent>({
    id: String,
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.Parent || mongoose.model<Parent>("Parent", ParentSchema);
