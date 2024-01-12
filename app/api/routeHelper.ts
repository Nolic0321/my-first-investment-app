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
