import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import Users from "@models/IUser";
import {dbConnect} from "../routeHelper";

dotenv.config();

export const POST = async (req: Request) => {
    await dbConnect();
    const loginData = await req.json() as LoginData; // Assuming the user ID is passed as a URL parameter
    try {
        const user = await Users.findOne({username: loginData.username, password:loginData.password}).exec(); // Replace 'UserSchema' with your actual User schema
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
            statusText:'Server error'
        });
    }
}
