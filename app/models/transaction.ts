
export interface Transaction {
    _id?: any;
    amount: number;
    date: Date;
    childId: string;
    reason: string;
    approved: ApprovalStatus
}

export enum ApprovalStatus {
    Pending,
    Approved,
    Rejected
}
