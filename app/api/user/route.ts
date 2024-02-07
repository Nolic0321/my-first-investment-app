import {IUser} from "@models/user";
import {Collection, findMany, insertOne} from "@mongoDataApiHelper";

export const GET = async () => {
    try{
        const users = await findMany<IUser>(Collection.Users,{});
        return Response.json(users?.documents);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}

export const POST = async(req: Request) =>{
    try {
        const requestData = await req.json();
        const user = await insertOne<IUser>(Collection.Users,requestData as IUser);
        return Response.json(requestData);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
