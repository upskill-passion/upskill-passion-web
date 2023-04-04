import useSWR from "swr";
import { getPostedBlogs } from "../api/blogsApi";
import BlogCard from "../components/BlogCard";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const PostedBlogs = () => {
  const { userId } = useParams();
  const {
    isLoading,
    error,
    data: blogs,
  } = useSWR(`/postedBlogs/${userId}`, getPostedBlogs);

  console.log("blogs: ", blogs);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <div className="blogsgrid">
        {blogs?.length ? (
          blogs?.map((item, idx) => (
            <Box key={idx}>
              <BlogCard blog={item} />
            </Box>
          ))
        ) : (
          <p>No Blogs Posted by this user.</p>
        )}
      </div>
    );
  }

  return content;
};
export default PostedBlogs;
