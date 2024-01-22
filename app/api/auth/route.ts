import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import {findOne} from "@mongoDataApiHelper";
import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";

dotenv.config();

export const POST = async (req: Request) => {
    const loginData = await req.json() as LoginData; // Assuming the user ID is passed as a URL parameter
    try {
        const userFindResult = await findOne<IUser>("users", {
                username: loginData.username,
                password: loginData.password
            });
        if (!userFindResult?.document) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        const childAccount = await findOne<ChildAccount>('childaccounts',{_id: {$oid: userFindResult.document._id}});
        if(!childAccount?.document){
            return Response.json(userFindResult.document)
        }else{
            return Response.json(childAccount.document);
        }

    } catch (error) {
        return new Response(null,{
            status:500,
            statusText:'Server error'
        });
    }
}
