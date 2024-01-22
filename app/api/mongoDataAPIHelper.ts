import dotenv from 'dotenv';
import {number} from "prop-types";

dotenv.config();


export async function findById<T>(collection: string, id: string): Promise<FindOneResponse<T> | null> {
    try {
        return await findOne(collection, {_id: id});
    } catch (e) {
        return null;
    }
}

/**
 * Fetches a single document from a MongoDB collection that matches the provided filter.
 * @param {string} collection - The name of the MongoDB collection.
 * @param {object} [filter] - The filter criteria to apply to the MongoDB query.
 * @returns {Promise<T|null>} - Returns a Promise that resolves to the document that matches the filter criteria, or null if no document was found or an error occurred.
 */
export async function findOne<T>(collection: string, filter?: object): Promise<FindOneResponse<T> | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            filter: {...filter}
        }

        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/findOne`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Fetches multiple documents from a MongoDB collection that match the provided filter.
 * @param {string} collection - The name of the MongoDB collection.
 * @param {object} [filter] - The filter criteria to apply to the MongoDB query.
 * @returns {Promise<T[]|null>} - Returns a Promise that resolves to an array of documents that match the filter criteria, or null if no documents were found or an error occurred.
 */
export async function findMany<T>(collection: string, filter?: object): Promise<FindManyResponse<T> | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            filter: {...filter}
        }

        console.log(`findMany body: ${JSON.stringify(body)}`);

        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/find`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Inserts a single document into a MongoDB collection.
 * @param {string} collection - The name of the MongoDB collection.
 * @param {T} documentData - The data of the document to insert.
 * @returns {Promise<T|null>} - Returns a Promise that resolves to the inserted document, or null if an error occurred.
 */
export async function insertOne<T>(collection: string, documentData: T): Promise<InsertOneResponse | null> {
    console.log(`insertOne collection: ${collection} documentData: ${JSON.stringify(documentData)} `);
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            document: documentData
        };

        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/insertOne`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Inserts multiple documents into a MongoDB collection.
 * @param {string} collection - The name of the MongoDB collection.
 * @param {T[]} documentsData - The data of the documents to insert.
 * @returns {Promise<T[]|null>} - Returns a Promise that resolves to the inserted documents, or null if an error occurred.
 */
export async function insertMany<T>(collection: string, documentsData: T[]): Promise<InsertManyResponse | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            documents: documentsData
        };

        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/insertMany`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
        });

        return await response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function updateOneById<T>(collection: string, id: string, update: object): Promise<UpdateOneResponse | null> {
    try {
        return await updateOne(collection, {_id: {$oid:id}}, update);
    } catch (e) {
        return null;
    }
}

export async function updateOne<T>(collection: string, filter: object, update: object): Promise<UpdateOneResponse|null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            filter: filter,
            update: {
                $set: {...update}
            }
        }
        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/updateOne`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
        });
        return await response.json();
    } catch
        (e) {
        console.log(e);
        return null;
    }
}

export type FindOneResponse<T> = {
    document: T
}

export type FindManyResponse<T> = {
    documents: T[]
}

export type InsertOneResponse = {
    insertedId: string
}

export type InsertManyResponse = {
    insertedIds: string[]
}

export type UpdateOneResponse = {
    matchedCount: number,
    modifiedCount: number,
    upsertedId?: string
}

export type UpdateManyResponse = {
    matchedCount: number,
    modifiedCount: number,
    upsertedId?: string
}

export type DeleteResponse = {
    deletedCount: number
}
