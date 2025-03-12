/*
- Getting (ChildAccount, amount)
- Return (ChildAccount) with adjusted balance
- If child not found, return error

- Create a new transaction with the given amount and set as approved
- Update the child's balance
- Return the updated child account
 */

import {Transaction} from "@models/transaction";
import {Collection, findOne, insertOne, updateOneById} from "@mongoDataApiHelper";
import {ChildAccount} from "@models/child-account";

export async function POST(req: Request, {params}:{params:{id:string}}){
	try {
		const requestData = await req.json() as Transaction;
		const insertResult = await insertOne<Transaction>(Collection.Transactions, requestData);
		if(!insertResult || !insertResult.insertedId) throw new Error('Failed to add adjustment');
		const childAccount = await findOne<ChildAccount>(Collection.ChildAccounts, {
			_id: { $oid: requestData.childId}
		});
		if(!childAccount?.document) throw new Error('Child not found');
		console.log(childAccount.document);
		childAccount.document.balance += requestData.amount;
		console.log(childAccount.document);
		const updateResult = await updateOneById<ChildAccount>(Collection.ChildAccounts,
			childAccount.document._id,
			{
				balance: Number(childAccount.document.balance)
			}
		)
		if(!updateResult?.modifiedCount || updateResult.modifiedCount < 1) throw new Error('Failed to update childAccount');
		return Response.json(childAccount.document);
	}
	catch (error) {
		return new Response(null, {
			status: 500,
			statusText: `Server error: ${error}`
		});
	}
}
