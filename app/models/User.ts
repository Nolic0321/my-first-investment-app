// export type User = {
//     id: string;
//     username: string;
//     password: string; // In a real app, passwords should be hashed and not stored as plain text
//     displayName: string;
// }

import mongoose from "mongoose";

export interface Users extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    displayName: string;
}

const UserSchema = new mongoose.Schema<Users>({
    id: String,
    username: String,
    password: String,
    displayName: String
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);
