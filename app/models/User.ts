import mongoose from "mongoose";

export interface User{
    id: string;
    username: string;
    password: string; // In a real app, passwords should be hashed and not stored as plain text
    displayName: string;
}

const UserSchema = new mongoose.Schema<User>({
    id: String,
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
