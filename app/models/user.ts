import mongoose, {Schema} from "mongoose";

export interface IUser {
    _id?:string;
    username: string;
    password: string; // In a real app, passwords should be hashed and not stored as plain text
    displayName: string;
}

const UserSchema = new Schema<IUser>({
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
