import {dbConnect} from "../routeHelper";
import {ChildAccount} from "@models/child-account";
import User, {IUser} from "@models/user";

dbConnect();
export const POST = async (req: Request) =>{
    try {
        console.log(`api/childaccount POST`);
        const requestData = await req.json();
        console.log(`api/childaccount POST: ${JSON.stringify(requestData)}`)
        const childAccount = (await ChildAccount.create(requestData)) as ChildAccount;
        try{

            const user = await User.findById(childAccount._id);
            if(!user){
                console.log(`user not found, creating new user`)
                console.log(`childAccount as IUser: ${JSON.stringify(childAccount as IUser)}`)
                const newUser:IUser = {
                    _id: childAccount._id,
                    username: childAccount.username,
                    password: childAccount.password,
                    displayName: childAccount.displayName
                }
                await User.create(newUser);
            }
        } catch (e){

        }
        return Response.json(childAccount);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}

export const GET = async(req: Request) =>{
    try{
        const data = await req.json() as {parentId: string};
        const users = await ChildAccount.find({parentId: data.parentId});
        return Response.json(users);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
