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

const connection: { readyState: number } = {readyState: 0};

export async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    // 0: disconnected
    // 1: connected
    // 2: connecting
    // 3: disconnecting
    if (connection && connection.readyState > 0 && connection.readyState < 3){
        console.log(`dbConnect: connection.readyState = ${connection.readyState}`);
        return;
    }
    console.log(`creating new connection dbConnect: connection.readyState = ${connection.readyState}`);

    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`# of connections ${db.connections.length}`)
    connection.readyState = db.connections[0].readyState;
}
