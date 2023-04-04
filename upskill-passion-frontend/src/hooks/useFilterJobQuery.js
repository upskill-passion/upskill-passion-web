import { useContext } from "react";
import FilterJobContext from "../context/FilterJobDataProvider";

export default function useFilterJobQuery() {
  return useContext(FilterJobContext);
}
