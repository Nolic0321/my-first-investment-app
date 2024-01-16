import dotenv from "dotenv";
import mongoose from 'mongoose';
import {ClientType} from "../../enums/clientType";

export const GET = async (req:Request, res:Response) => {
    dotenv.config();
    switch (process.env.ENVIRONMENT) {
        case "mock":
            return new Response(ClientType.Mock);
        case 'dev':
        case 'test':
        case "production":
            await mongoose.connect(process.env.MONGODB_URI as string);
            return new Response(ClientType.Mongo);
        default:
            return new Response(null,{
                status:500,
                statusText:'Environment not set'
            });
    }
}
