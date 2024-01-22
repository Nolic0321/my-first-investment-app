import {IUser} from "@models/user";
import {ChildAccount} from "@models/child-account";
import {findById, updateOneById} from "@mongoDataApiHelper";
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const childAccount = await findById<ChildAccount>("childaccounts",params.id);
        if (!childAccount) {
            return new Response(null, {
                status: 404,
                statusText: 'User not found'
            });
        }
        return Response.json(childAccount);
    } catch (error) {
        return new Response(null, {

            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}

export const PUT = async (req: Request, {params}: { params: { id: string } }) => {
    try {
        const requestData = await req.json() as IUser;
        const updateOneResponse = await updateOneById<ChildAccount>('childaccounts',params.id, requestData);
        if (!updateOneResponse) {
            return new Response(null, {
                status: 404,
                statusText: 'User not found'
            });
        }
        return Response.json(updateOneResponse);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
