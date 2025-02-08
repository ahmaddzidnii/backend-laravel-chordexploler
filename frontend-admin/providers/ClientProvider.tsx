"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";

const ClientProvider = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <>{children}</>;
};
export default ClientProvider;
