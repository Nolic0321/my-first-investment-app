import {IUser} from "@models/user";
import {dbConnect} from "../../routeHelper";
import ChildAccount from "@models/child-account";

dbConnect();
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const childAccount = await ChildAccount.findById(params.id);
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

export const PATCH = async (req: Request, {params}: { params: { id: string } }) => {
    try {
        const requestData = await req.json() as IUser;
        const childAccount = await ChildAccount.findByIdAndUpdate(params.id, requestData, {new: true});
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
