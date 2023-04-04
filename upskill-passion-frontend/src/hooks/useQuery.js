import QueryContext from "../context/QueryContextProvider";
import { useContext } from "react";

const useQuery = () => {
  return useContext(QueryContext);
};

export default useQuery;
