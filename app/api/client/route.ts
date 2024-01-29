import dotenv from "dotenv";
import {ClientType} from "../../enums/clientType";

export const GET = async () => {
    dotenv.config();
    switch (process.env.ENVIRONMENT) {
        case "mock":
            return new Response(ClientType.Mock);
        case 'preview':
        case 'dev':
        case 'test':
        case "production":
            return new Response(ClientType.Mongo);
        default:
            return new Response(null,{
                status:500,
                statusText:'Environment not set'
            });
    }
}
