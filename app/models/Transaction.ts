import mongoose from "mongoose";

export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    childId: string;
    reason: string;
}

const TransactionSchema = new mongoose.Schema<Transaction>({
    id: String,
    amount: Number,
    date: Date,
    childId: String,
    reason: String
});

export default mongoose.models.Transaction || mongoose.model<Transaction>("Transaction", TransactionSchema);
