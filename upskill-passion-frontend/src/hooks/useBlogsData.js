import useSWR from "swr";
import { getBlogs, blogsUrlEndpoint as cacheKey } from "../api/blogsApi";

const useBlogsData = (queryString = "") => {
  const { isLoading, error, data } = useSWR(
    `${cacheKey}${queryString}`,
    getBlogs
  );
  return {
    blogs: data,
    isLoading,
    error,
  };
};

export default useBlogsData;
