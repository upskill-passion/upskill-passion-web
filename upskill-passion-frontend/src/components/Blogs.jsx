import { Box } from "@mui/material";
import BlogCard from "./BlogCard";

import useBlogsData from "../hooks/useBlogsData";
import useFilterBlogsQuery from "../hooks/useFilterBlogsQuery";

const Blogs = () => {
  const { queryString } = useFilterBlogsQuery();
  const { blogs, isLoading, error } = useBlogsData(queryString);
  // console.log("Blogs: ", blogs);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <div className="blogsgrid">
        {blogs?.map((item, idx) => (
          <Box key={idx}>
            <BlogCard blog={item} />
          </Box>
        ))}
      </div>
    );
  }
  return content;
};
export default Blogs;
