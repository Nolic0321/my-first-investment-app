import mongoose, {Schema} from "mongoose";

export interface IUser {
    id:string;
    username: string;
    password: string; // In a real app, passwords should be hashed and not stored as plain text
    displayName: string;
}

interface UserDocument extends IUser, Document {
    _id: any;
}

const UserSchema = new Schema<IUser>({
    username: String,
    password: String,
    displayName: String
});

UserSchema.virtual('id').get(function(this: UserDocument) {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
