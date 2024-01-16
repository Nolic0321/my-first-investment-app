import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export function CreateResponse(status: number, message: string, data?: any): Response {
    return new Response(
        data ? JSON.stringify(data) : "",
        {
            status: status,
            statusText: message,
            headers: {
                'Content-Type': 'application/json',
            }
        });
}

const connection: { isConnected?: number } = {};

export async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = db.connections[0].readyState;
}
