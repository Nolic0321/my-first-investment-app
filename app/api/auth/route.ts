import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import Users from "@models/user";
import {dbConnect} from "../routeHelper";

dotenv.config();

export const POST = async (req: Request) => {
    console.log('auth')
    await dbConnect();
    const loginData = await req.json() as LoginData; // Assuming the user ID is passed as a URL parameter
    try {
        console.log(`searching  ${loginData}`)
        const user = await Users.findOne({username: loginData.username, password:loginData.password}).exec(); // Replace 'UserSchema' with your actual User schema
        if (!user) {
            console.log(`user not found ${loginData.username} ${loginData.password}`);
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        console.log(`found user ${user}`)
        return Response.json(user);
    } catch (error) {
        console.log(`error ${error}`)
        return new Response(null,{
            status:500,
            statusText:'Server error'
        });
    }
}
