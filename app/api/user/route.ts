import {dbConnect} from "../routeHelper";
import User from "@models/user";

dbConnect();
export const GET = async () => {
    try{
        const users = await User.find({});
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
        const user = await User.create(requestData);
        return Response.json(user);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
