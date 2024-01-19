import mongoose from "mongoose";

export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    childId: string;
    reason: string;
}

interface TransactionDocument extends Transaction, Document {
    _id: any;
}

const TransactionSchema = new mongoose.Schema<Transaction>({
    id: String,
    amount: Number,
    date: Date,
    childId: String,
    reason: String
});

TransactionSchema.virtual('id').get(function(this: TransactionDocument) {
    return this._id.toHexString();
});

TransactionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

export default mongoose.models.Transaction || mongoose.model<Transaction>("Transaction", TransactionSchema);
