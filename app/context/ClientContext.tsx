'use client'
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import IClient, { create } from '../models/client';

// Create the context
export const ClientContext = createContext<IClient|null>(null);
interface ClientProviderProps {
    children: ReactNode;
}
// Create the provider
export const ClientProvider: React.FC<ClientProviderProps> = React.memo(({ children }) => {
  console.log(`ClientProvider: creating client context`);
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Create the client based on the environment
    console.log(`ClientProvider: creating client`)
    const newClient = create("mock");
    console.log(`newClient ${newClient}`)
    setClient(newClient);
    setLoading(false)
  }, []);

  if(!client)
    return <div>Client not loaded</div>

  if(loading)
    return <div>ClientContext: Loading client context.</div>


  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  );
});
ClientProvider.displayName = "ClientProvider";
