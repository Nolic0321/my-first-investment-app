import {dbConnect} from "../routeHelper";
import ChildAccount from "@models/child-account";

dbConnect();
export const POST = async (req: Request) =>{
    try {
        const requestData = await req.json();
        const user = await ChildAccount.create(requestData);
        return Response.json(user);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}

export const GET = async(req: Request) =>{
    try{
        const data = await req.json() as {parentId: string};
        const users = await ChildAccount.find({parentId: data.parentId});
        return Response.json(users);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
