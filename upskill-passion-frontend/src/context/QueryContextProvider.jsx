import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const QueryContext = createContext();

export const QueryContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider
      value={{
        query: query,
        setQuery: setQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
