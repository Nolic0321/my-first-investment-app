import {ChildAccount} from "@models/child-account";
import {findMany} from "@mongoDataApiHelper";

export const GET = async(req: Request, {params}: {params:{id:string}}) =>{
    try{
        const users = await findMany<ChildAccount[]>('childaccounts',{parentId: params.id});
        if(!users?.documents) throw new Error('No child accounts found');
        return Response.json(users.documents);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
