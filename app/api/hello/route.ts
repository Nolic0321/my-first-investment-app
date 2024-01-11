import mongoose from "mongoose";
import dotenv from 'dotenv';
import MockClient from "../../clients/mockClient";
import {NextResponse} from "next/server";

dotenv.config();

export const GET = async () => {
    switch (process.env.ENVIRONMENT) {
        case "mock":
            console.log('getting mock');
            const mockClient = new MockClient();
            return NextResponse.json({data:mockClient.getUsers()});
        case "mongo":
            const db = await mongoose.connect(process.env.MONGODB_URI as string);
            db.connection.on('error', console.error.bind(console, 'connection error:'));
            db.connection.once('open', function () {
                console.debug('Connected to MongoDB');
            });
            db?console.log("HELLO"):console.log("NOPE");
            return Response.json({success:true});
        default:
            return new Response("", {
                status: 500,
                statusText: "Environment not set",
            });
    }
}
