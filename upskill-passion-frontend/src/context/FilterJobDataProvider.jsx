import { createContext, useState } from "react";
// import axios from "../api/axios";

const FilterJobContext = createContext({});

export const FilterdJobDataProvider = ({ children }) => {
  const [queryString, setQueryString] = useState("");

  return (
    <FilterJobContext.Provider value={{ queryString, setQueryString }}>
      {children}
    </FilterJobContext.Provider>
  );
};

export default FilterJobContext;
