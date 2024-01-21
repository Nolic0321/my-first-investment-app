import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import {findOne} from "@mongoDataApiHelper";
import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";

dotenv.config();

export const POST = async (req: Request) => {
    const loginData = await req.json() as LoginData; // Assuming the user ID is passed as a URL parameter
    try {
        const user = await findOne<IUser>("users", {
                username: loginData.username,
                password: loginData.password
            });
        if (!user) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        const childAccount = await findOne<ChildAccount>('childaccounts',{_id: {$oid: user._id}});
        if(!childAccount){
            return Response.json(user)
        }else{
            return Response.json(childAccount);
        }

    } catch (error) {
        return new Response(null,{
            status:500,
            statusText:'Server error'
        });
    }
}
