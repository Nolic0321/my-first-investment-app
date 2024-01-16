import Users, {IUser} from "@models/IUser";
import {dbConnect} from "../../routeHelper";
import {NextApiRequest} from "next";

dbConnect();
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const user = await Users.findById(params.id); // Replace 'UserSchema' with your actual User schema
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

export const PUT = async (req: Request, {params}: { params: { id: string } }) => {
    try {
        const userData = await req.json() as IUser; // Assuming the user ID is passed as a URL parameter
        const user = await Users.findByIdAndUpdate(params.id, userData, {new: true}); // The 'new' option returns the updated document
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
