import Users, {User} from "@models/User";
import {dbConnect} from "../../routeHelper";

export const GET = async ({params}:{params:{id:string}}) => {
    try {
        await dbConnect();
        const user = await Users.findById(params.id); // Replace 'UserSchema' with your actual User schema
        if (!user) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        return Response.json(user);
    } catch (error) {
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}

export const PUT = async (req:Request, {params}:{params:{id:string}}) => {
    try{
        await dbConnect();
        const userData = await req.json() as User; // Assuming the user ID is passed as a URL parameter
        const user = await Users.findByIdAndUpdate(params.id, userData, {new: true}); // The 'new' option returns the updated document
        if (!user) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        return Response.json(user);
    } catch (error) {
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
