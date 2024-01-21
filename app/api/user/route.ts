import {IUser} from "@models/user";
import {findMany, insertOne} from "@mongoDataApiHelper";

export const GET = async () => {
    try{
        const users = await findMany<IUser>('users',{});
        return Response.json(users);
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
        const user = await insertOne<IUser>('users',requestData as IUser);
        return Response.json(user);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
