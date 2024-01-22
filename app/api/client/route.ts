import dotenv from "dotenv";
import mongoose from 'mongoose';
import {ClientType} from "../../enums/clientType";

export const GET = async () => {
    console.log(`Environment: ${process.env.ENVIRONMENT}`);
    console.log(`api/client GET`);
    dotenv.config();
    switch (process.env.ENVIRONMENT) {
        case "mock":
            console.log(`using mock client`);
            return new Response(ClientType.Mock);
        case 'preview':
        case 'dev':
        case 'test':
        case "production":
            console.log(`using mongo client`);
            await mongoose.connect(process.env.MONGODB_URI as string);
            return new Response(ClientType.Mongo);
        default:
            console.log(`environment not found`);
            return new Response(null,{
                status:500,
                statusText:'Environment not set'
            });
    }
}
