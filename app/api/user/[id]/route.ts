import {IUser} from "@models/user";
import {findById, updateOneById} from "@mongoDataApiHelper";
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const user = await findById<IUser>('users',params.id); // Replace 'UserSchema' with your actual User schema
        if (!user) {
            return new Response(null, {
                status: 404,
                statusText: 'User not found'
            });
        }
        return Response.json(user);
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
        const userId = await updateOneById('users',params.id, userData); // The 'new' option returns the updated document
        if (!userId) {
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
