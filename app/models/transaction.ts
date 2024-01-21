import mongoose from "mongoose";

export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    childId: string;
    reason: string;
}
