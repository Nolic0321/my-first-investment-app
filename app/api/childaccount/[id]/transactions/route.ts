import {Collection, findMany, FindManyResponse, insertOne} from "@mongoDataApiHelper";
import {ApprovalStatus, Transaction} from "@models/transaction";

export async function POST(req: Request){
    try {
        const requestData = await req.json();
        const newTransactionId = await insertOne(Collection.Transactions, requestData);
        if(!newTransactionId) throw new Error('Failed to request transaction');
        const pendingTransactions = await findMany<FindManyResponse<Transaction>>(Collection.Transactions, {
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

export async function GET(req: Request, {params}: {params: {id: string}}){
    try {
        const transactions = await findMany<FindManyResponse<Transaction>>(Collection.Transactions, {
            childId: params.id,
            approved: {$eq: ApprovalStatus.Pending}
        });
        return Response.json(transactions?.documents);
    }
    catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
