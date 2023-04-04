import { createContext, useState } from "react";
// import axios from "../api/axios";

const FilterBlogContext = createContext({});

export const FilterdBlogDataProvider = ({ children }) => {
  const [queryString, setQueryString] = useState("");

  return (
    <FilterBlogContext.Provider value={{ queryString, setQueryString }}>
      {children}
    </FilterBlogContext.Provider>
  );
};

export default FilterBlogContext;
