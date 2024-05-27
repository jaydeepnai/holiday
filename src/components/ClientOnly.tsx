"use client"
import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMonunted, setHasMonunted] = useState(false);

  useEffect(() => {
    setHasMonunted(true)
  }, [])
  
  if(!hasMonunted){
    return null
   }

  return <div>{children}</div>;
};

export default ClientOnly;
