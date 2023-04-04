import BlogPost from "../components/BlogPost";
import useAuth from "../hooks/useAuth";

const CreateBlog = () => {
  const { auth } = useAuth();
  console.log(auth);
  return <BlogPost />;
};
export default CreateBlog;
