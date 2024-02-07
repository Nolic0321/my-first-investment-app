import {ApprovalStatus, Transaction} from "@models/transaction";
import {ChildAccount} from "@models/child-account";
import {Collection, findMany, updateOneById} from "@mongoDataApiHelper";

export async function GET(req: Request, {params}:{params:{id:string}}){
    try{
        const childAccountResults = await findMany<ChildAccount>(Collection.ChildAccounts,{parentId: params.id});
        if(!childAccountResults) return Response.json([]);
        const childAccounts = childAccountResults.documents;
        const transactions = await findMany<Transaction[]>(Collection.Transactions,{
            childId: {$in: childAccounts!.map(childAccount => { return childAccount._id})},
            approved: ApprovalStatus.Pending
        });

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
        const newTransactionId = await updateOneById(Collection.Transactions,requestData._id, requestData);
        if(!newTransactionId?.modifiedCount) throw new Error('Failed to request transaction');
        const pendingTransactions = await findMany<Transaction>(Collection.Transactions, {
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
