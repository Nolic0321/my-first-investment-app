import MockClient from "./mockClient";
import MongoDbClient from "./mongoDbClient";
import {ClientType} from "../enums/clientType";
import IClient from "@models/client";



export function GetClient(clientType:ClientType):IClient|null{
    switch(clientType){
        case ClientType.Mock:
            return new MockClient();
        case ClientType.Mongo:
            return new MongoDbClient();
        default:
            return null;
    }
}
