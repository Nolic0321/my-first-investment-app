import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import Users, {User} from "@models/User";
import mongoose from 'mongoose';

dotenv.config();

export const POST = async (req: Request, res: Response) => {
    const loginData = await req.json() as LoginData; // Assuming the user ID is passed as a URL parameter
    console.log(`loginData: ${JSON.stringify(loginData)}`)
    console.log(`Connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
    try {
        const user = await Users.findOne({username: loginData.username, password:loginData.password}).exec(); // Replace 'UserSchema' with your actual User schema
        console.log(`user: ${JSON.stringify(user)}`);
        if (!user) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        return Response.json(user);
    } catch (error) {
        console.error(error);
        return new Response(null,{
            status:500,
            statusText:'Server error'
        });
    }
}
