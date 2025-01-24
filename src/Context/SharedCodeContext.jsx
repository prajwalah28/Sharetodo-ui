import React, { createContext, useState, useContext } from 'react';

// Create a context to hold the shared code
const SharedCodeContext = createContext();

export const useSharedCode = () => {
  return useContext(SharedCodeContext);
};

export const SharedCodeProvider = ({ children }) => {
  const [sharedCode, setSharedCode] = useState("");

  return (
    <SharedCodeContext.Provider value={{ sharedCode, setSharedCode }}>
      {children}
    </SharedCodeContext.Provider>
  );
};
