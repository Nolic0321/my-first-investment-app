import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import Users from "@models/user";
import {dbConnect} from "../routeHelper";
import {ChildAccount} from "@models/child-account";

dotenv.config();

export const POST = async (req: Request) => {
    await dbConnect();
    const loginData = await req.json() as LoginData; // Assuming the user ID is passed as a URL parameter
    try {
        const user = await Users.findOne({username: loginData.username, password:loginData.password}).exec(); // Replace 'UserSchema' with your actual User schema
        const childAccount = await ChildAccount.findById(user?._id);
        if (!user) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        console.log(`user found: ${JSON.stringify(user)}`);
        console.log(`childAccount found: ${JSON.stringify(childAccount)}`);
        if(!childAccount) {
            console.log(`childAccount not found, returning user`)
            return Response.json(user);
        }else{
            console.log(`childAccount found, returning childAccount`)
            return Response.json(childAccount);
        }
    } catch (error) {
        return new Response(null,{
            status:500,
            statusText:'Server error'
        });
    }
}
