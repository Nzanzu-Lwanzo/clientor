import React, { createContext, useContext, useState } from "react";

interface ClientorContexttype {
  
}

const ClientorContext = createContext<ClientorContexttype | null>(null);

export const useClientorContext = () => {
  return useContext(ClientorContext)!;
};

export const ClientorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value: ClientorContexttype = {};

  return (
    <ClientorContext.Provider value={value}>
      {children}
    </ClientorContext.Provider>
  );
};
