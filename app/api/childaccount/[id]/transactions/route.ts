import {findById, findMany, insertOne} from "@mongoDataApiHelper";
import {ApprovalStatus, Transaction} from "@models/transaction";

export async function POST(req: Request, {params}:{params:{id:string}}){
    console.log(`api/childaccount/${params.id}/transactions POST`);
    try {
        const requestData = await req.json();
        const newTransactionId = await insertOne('transactions', requestData);
        if(!newTransactionId) throw new Error('Failed to request transaction');
        const pendingTransactions = await findMany<Transaction[]>('transactions', {
            childId: requestData.childId,
            approved: {$eq: ApprovalStatus.Pending}
        })
        return Response.json(pendingTransactions);
    }
    catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
