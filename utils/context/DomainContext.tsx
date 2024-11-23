"use client";

import React, { createContext, useContext, ReactNode } from "react";

const DomainContext = createContext<string | undefined>(undefined);

export const DomainProvider = ({
  children,
  domain,
}: {
  children: ReactNode;
  domain: string;
}) => {
  return (
    <DomainContext.Provider value={domain}>{children}</DomainContext.Provider>
  );
};

export const useDomain = () => {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error("useDomain must be used within a DomainProvider");
  }
  return context;
};
