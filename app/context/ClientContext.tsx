'use client'
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import IClient, { create } from '../clients/clientFactory';

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
    const newClient = create("mock");
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
