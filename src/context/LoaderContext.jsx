import { createContext, useState } from "react";

export const LoaderContext = createContext();

export function LoaderContextrovider({ children }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
