'use client'
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import IClient, { GetClient } from '../clients/clientFactory';
import {ClientType} from "../enums/clientType";

// Create the context
export const ClientContext = createContext<IClient|null>(null);
interface ClientProviderProps {
    children: ReactNode;
}
// Create the provider
export const ClientProvider: React.FC<ClientProviderProps> = React.memo(({ children }) => {
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Create the client based on the environment
    fetch('api/client')
        .then(response => response.text())
        .then(data => {
            const newClient = GetClient(data as ClientType);
            setClient(newClient);
            setLoading(false)
        });
  }, []);


  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  );
});
ClientProvider.displayName = "ClientProvider";
