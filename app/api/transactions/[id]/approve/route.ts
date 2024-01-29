import {findMany, updateOneById} from "@mongoDataApiHelper";
import {ApprovalStatus, Transaction} from "@models/transaction";

export async function POST(req: Request, {params}:{params:{id:string}}){
    try {
        const requestData = await req.json();
        const transactionData = {...requestData, _id: { $oid: requestData._id }};
        const newTransactionId = await updateOneById<Transaction>('transactions',params.id, transactionData);
        if(!newTransactionId?.matchedCount) throw new Error('Failed to request transaction');
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
