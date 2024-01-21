import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";
import {findOne, insertOne} from "@mongoDataApiHelper";
import {ObjectId} from "mongodb";
export const POST = async (req: Request) =>{
    try {
        const requestData = await req.json();
        console.log(`api/childaccount POST: ${JSON.stringify(requestData)}`)
        const newChildAccountId = await insertOne<ChildAccount>("childaccounts",requestData as ChildAccount);
        if(!newChildAccountId){ throw new Error('Error creating child account');}
        let childUser = await findOne<IUser>('users',{_id: {$oid: newChildAccountId}});
        if(!childUser){
            console.log('Child user not found; creating new user');
            childUser = {
                _id:{$oid: newChildAccountId},
                username: requestData.username,
                password: requestData.password,
                displayName: requestData.displayName,
                isChildAccount: true
            };
            await insertOne<IUser>('users',childUser);
        }
        return Response.json(childUser);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}

export const GET = async(req: Request) =>{
    try{
        console.log('api/childaccount GET')
        const data = await req.json() as {parentId: string};
        console.log(`api/childaccount GET: ${JSON.stringify(data)}`);
        const users = await findOne<ChildAccount>('childaccounts',{parentId: data.parentId});
        return Response.json(users);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
