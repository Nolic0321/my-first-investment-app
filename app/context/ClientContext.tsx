'use client'
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {ClientType} from "../enums/clientType";
import IClient from "@models/client";
import {GetClient} from "../clients/clientFactory";

// Create the context
export const ClientContext = createContext<IClient|null>(null);
interface ClientProviderProps {
    children: ReactNode;
}
// Create the provider
export const ClientProvider: React.FC<ClientProviderProps> = React.memo(({ children }) => {
  const [client, setClient] = useState<IClient | null>(null);
  useEffect(() => {
    // Create the client based on the environment
    fetch('api/client')
        .then(response => response.text())
        .then(data => {
            const newClient = GetClient(data as ClientType);
            setClient(newClient);
        })
        .catch(error => {
            console.log(error);
        });
  }, []);


  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  );
});
ClientProvider.displayName = "ClientProvider";
