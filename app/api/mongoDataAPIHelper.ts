import dotenv from 'dotenv';

dotenv.config();

/**
 * @template T
 * Fetches a document from a MongoDB collection by its ID.
 * @param {string} collection - The MongoDB collection name.
 * @param {string} id - The ID of the document to fetch.
 * @returns {Promise<FindOneResponse<T> | null>} - A Promise that resolves to the fetched document or null if an error occurred.
 */
export async function findById<T>(collection: string, id: string): Promise<FindOneResponse<T> | null> {
    try {
        return await findOne(collection, {_id: id});
    } catch (e) {
        return null;
    }
}

/**
 * @template T
 * Fetches a single document from a MongoDB collection that matches the provided filter.
 * @param {string} collection - The MongoDB collection name.
 * @param {object} [filter] - The filter criteria for the MongoDB query.
 * @returns {Promise<FindOneResponse<T> | null>} - A Promise that resolves to the fetched document or null if an error occurred.
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
 * @template T
 * Fetches multiple documents from a MongoDB collection that match the provided filter.
 * @param {string} collection - The MongoDB collection name.
 * @param {object} [filter] - The filter criteria for the MongoDB query.
 * @returns {Promise<FindManyResponse<T> | null>} - A Promise that resolves to an array of fetched documents or null if an error occurred.
 */
export async function findMany<T>(collection: string, filter?: object): Promise<FindManyResponse<T> | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            filter: {...filter}
        }


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
 * @template T
 * Inserts a single document into a MongoDB collection.
 * @param {string} collection - The MongoDB collection name.
 * @param {T} documentData - The data of the document to insert.
 * @returns {Promise<InsertOneResponse | null>} - A Promise that resolves to the inserted id or null if an error occurred.
 */
export async function insertOne<T>(collection: string, documentData: T): Promise<InsertOneResponse | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            document: formatDocument(documentData)
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
 * @template T
 * Inserts multiple documents into a MongoDB collection.
 * @param {string} collection - The MongoDB collection name.
 * @param {T[]} documentsData - The data of the documents to insert.
 * @returns {Promise<InsertManyResponse | null>} - A Promise that resolves to an array of inserted id's or null if an error occurred.
 */
export async function insertMany<T>(collection: string, documentsData: T[]): Promise<InsertManyResponse | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            documents: documentsData.map(formatDocument)
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

/**
 * @template T
 * Updates a single document in a MongoDB collection by its ID.
 * @param {string} collection - The MongoDB collection name.
 * @param {string} id - The ID of the document to update.
 * @param {object} update - The update operations to be applied to the document.
 * @returns {Promise<UpdateOneResponse | null>} - A Promise that resolves to an object that describes how many items were updated or null if an error occurred.
 */
export async function updateOneById<T>(collection: string, id: string, update: object): Promise<UpdateOneResponse | null> {
    try {
        return await updateOne(collection, {_id: {$oid: id}}, update);
    } catch (e) {
        return null;
    }
}

/**
 * @template T
 * Updates a single document in a MongoDB collection that matches the provided filter.
 * @param {string} collection - The MongoDB collection name.
 * @param {object} filter - The filter criteria for the MongoDB query.
 * @param {object} update - The update operations to be applied to the document.
 * @returns {Promise<UpdateOneResponse|null>} - A Promise that resolves to an object that describes how many items were updated or null if an error occurred.
 */
export async function updateOne<T>(collection: string, filter: object, update: object): Promise<UpdateOneResponse | null> {
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

export async function deleteById(collection: string, id: string): Promise<DeleteResponse | null> {
    try {
        return await deleteOne(collection, {_id: {$oid: id}});
    } catch (e) {
        return null;
    }
}

export async function deleteOne(collection: string, filter: object): Promise<DeleteResponse | null> {
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            filter: filter
        }
        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/deleteOne`, {
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

export async function deleteMany(collection: string, filter: object): Promise<DeleteResponse | null>{
    try {
        const body = {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            filter: filter
        }
        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/deleteMany`, {
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

export async function aggregate<T>(collection: string, pipeline?:object): Promise <AggregateResponse<T> | null>{
    try{
        const body: any= {
            collection: collection,
            database: process.env.MONGODB_DATABASE,
            dataSource: process.env.MONGODB_DATASOURCE,
            pipeline: pipeline
         };

        const response = await fetch(`${process.env.MONGODB_DATA_API_URL}/aggregate`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
        });
        if(!response.ok) throw new Error(`Failed to fetch data from ${collection}: ${(await response.json())}`);
        return await response.json();
    } catch (e){
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

export type AggregateResponse<T> = {
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


function formatDocument(document: any): any{
    let formattedDocument: any = {};
    for (const key in document) {
        if (document[key] instanceof Date) {
            formattedDocument[key] = {$date:document[key]};
        }else{
            formattedDocument[key] = document[key];
        }
    }
    return formattedDocument;
}