// types.ts

export type User = {
	id: string;
	username: string;
	password: string; // In a real app, passwords should be hashed and not stored as plain text
	displayName: string;
}

export type Parent = User;

export type Child = User & {
	parentId: string;
	balance: number;
	interest: number;
	pendingRequests: Transaction[]
}

export type Transaction = {
	id: string;
	amount: number;
	date: Date;
}

export type Option = {
	error: string;
}
