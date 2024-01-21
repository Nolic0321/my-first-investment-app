import {ChildAccount} from "@models/child-account";
import {findMany} from "@mongoDataApiHelper";
export const GET = async(req: Request, {params}: {params:{id:string}}) =>{
    try{
        console.log('api/parent/childaccount GET')
        console.log(`api/parent/childaccount GET: ${JSON.stringify(params)}`);
        const users = await findMany<ChildAccount[]>('childaccounts',{parentId: params.id});
        return Response.json(users);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
