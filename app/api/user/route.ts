import {dbConnect} from "../routeHelper";
import User from "@models/IUser";

export const GET = async () => {
    await dbConnect();
    try{
        const users = await User.find({}); // Replace 'UserSchema' with your actual User schema
        return Response.json(users);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
