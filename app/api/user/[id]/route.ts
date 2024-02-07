import {IUser} from "@models/user";
import {Collection, findById, updateOneById} from "@mongoDataApiHelper";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const user = await findById<IUser>(Collection.Users,params.id); // Replace 'UserSchema' with your actual User schema
        if (!user?.document) {
            return new Response(null, {
                status: 404,
                statusText: 'User not found'
            });
        }
        return Response.json(user.document);
    } catch (error) {
        return new Response(null, {

            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}

export const PATCH = async (req: Request, {params}: { params: { id: string } }) => {
    try {
        const userData = await req.json() as IUser; // Assuming the user ID is passed as a URL parameter
        const userId = await updateOneById(Collection.Users,params.id, userData); // The 'new' option returns the updated document
        if (!userId?.modifiedCount) {
            return new Response(null, {
                status: 404,
                statusText: 'User not found'
            });
        }
        return Response.json(userData);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        });
    }
}
