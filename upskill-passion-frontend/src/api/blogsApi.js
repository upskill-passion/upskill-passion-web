import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 400));

// const BASE_URL = "http://localhost:3000/api/v1";
const BASE_URL = "http://localhost:8080";

const blogsApi = axios.create({
  baseURL: BASE_URL,
});

export const blogsUrlEndpoint = "/blogs";

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   //interceptors in axios
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

export const getBlogs = async (url) => {
  await delay();
  const response = await blogsApi.get(url);
  return response.data;
};

export const getPostedBlogs = async (url) => {
  // /postedBlogs/:userid
  // await delay();
  const response = await blogsApi.get(url);
  return response.data;
};

export const getBlogTags = async (url) => {
  // await delay();
  const response = await blogsApi.get(url);
  return response.data;
};

export const addNewBlog = async (blogObj) => {
  await delay();
  const response = await blogsApi.post(blogsUrlEndpoint, blogObj);
  return response.data;
};

export const updateBlog = async (blog) => {
  await delay();
  const response = await blogsApi.patch(`${blogsUrlEndpoint}/${blog.id}`, Blog);
  return response.data;
};

export const deleteBlog = async ({ id }) => {
  await delay();
  const response = await blogsApi.delete(`${blogsUrlEndpoint}/${id}`);
  return response.data;
};
