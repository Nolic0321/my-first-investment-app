import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";
import {findOne, insertOne} from "@mongoDataApiHelper";

export const POST = async (req: Request) =>{
    try {
        const requestData = await req.json();
        const newChildAccountId = await insertOne<ChildAccount>("childaccounts",requestData as ChildAccount);
        if(!newChildAccountId){ throw new Error('Error creating child account');}
        const updateChildAccountData = {
            ...requestData,
            _id: newChildAccountId.insertedId
        }

        let childUser = await findOne<IUser>('users',{_id: {$oid: newChildAccountId.insertedId}});
        if(!childUser){
            const newChildUser:IUser = {
                _id:{$oid: newChildAccountId.insertedId},
                username: requestData.username,
                password: requestData.password,
                displayName: requestData.displayName,
                isChildAccount: true
            };
            await insertOne<IUser>('users',newChildUser);
        }
        return Response.json(updateChildAccountData);
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
        const result = await findOne<ChildAccount>('childaccounts',{parentId: data.parentId});
        if(!result?.document) throw new Error('Child account not found');
        return Response.json(result?.document);
    }catch (error){
        return new Response(null,{
            status:500,
            statusText:`Server error: ${error}`
        });
    }
}
