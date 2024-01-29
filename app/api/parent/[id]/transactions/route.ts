import {ApprovalStatus, Transaction} from "@models/transaction";
import {ChildAccount} from "@models/child-account";
import {findMany, updateOneById} from "@mongoDataApiHelper";

export async function GET(req: Request, {params}:{params:{id:string}}){
    try{
        const childAccountResults = (await findMany<ChildAccount>('childaccounts',{parentId: params.id}));
        if(!childAccountResults?.documents) throw new Error('No child accounts found');
        const childAccounts = childAccountResults.documents;
        const transactions = await findMany<Transaction[]>('transactions',{
            childId: {$in: childAccounts!.map(childAccount => { return childAccount._id})},
            approved: ApprovalStatus.Pending
        });
        console.log(`childAccounts: ${JSON.stringify(transactions?.documents)}`)
        return Response.json(transactions?.documents);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}

export async function POST(req: Request, {params}:{params:{id:string}}){
    try {
        const requestData = await req.json() as Transaction;
        const newTransactionId = await updateOneById('transactions',requestData._id, requestData);
        if(!newTransactionId?.modifiedCount) throw new Error('Failed to request transaction');
        const pendingTransactions = await findMany<Transaction>('transactions', {
            childId: requestData.childId,
            approved: {$eq: ApprovalStatus.Pending}
        })
        return Response.json(pendingTransactions?.documents);
    }
    catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
