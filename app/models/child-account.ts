import {IUser} from "@models/user";
import mongoose from "mongoose";

export interface ChildAccount extends IUser{
    parentId: string;
    balance: number;
    interest: number;
}

interface ChildAccountDocument extends ChildAccount, Document {
    _id: any;
}

const ChildAccountSchema = new mongoose.Schema<ChildAccount>({
    id: String,
    username: String,
    password: String,
    displayName: String,
    parentId: String,
    balance: Number,
    interest: Number
});

ChildAccountSchema.virtual('id').get(function(this: ChildAccountDocument) {
    return this._id.toHexString();
});

ChildAccountSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

export default mongoose.models.Child || mongoose.model<ChildAccount>("ChildAccount", ChildAccountSchema);
