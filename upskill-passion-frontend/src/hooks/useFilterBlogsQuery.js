import { useContext } from "react";
import FilterBlogContext from "../context/FilterBlogDataProvider";

export default function useFilterBlogsQuery() {
  return useContext(FilterBlogContext);
}
