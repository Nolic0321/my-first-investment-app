'use client'
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import IClient, { create } from '../models/client';
import MockClient from '../models/mockClient';

// Create the context
export const ClientContext = createContext<IClient>(new MockClient());
interface ClientProviderProps {
    children: ReactNode;
}
// Create the provider
export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [client, setClient] = useState(new MockClient());

  useEffect(() => {
    // Create the client based on the environment
    const newClient = create("mock");
    setClient(newClient);
  }, []);

  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  );
};
