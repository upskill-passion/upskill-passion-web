import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 400));

// const BASE_URL = "http://localhost:3000/api/v1";
const BASE_URL = "http://localhost:8080";

const jobsApi = axios.create({
  baseURL: BASE_URL,
});

export const jobsUrlEndpoint = "/jobs";

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   //interceptors in axios
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

export const getJobs = async (url) => {
  await delay();
  const response = await jobsApi.get(url);
  return response.data;
};

export const getPostedJobs = async (url) => {
  // /postedJobs/:userid
  // await delay();
  const response = await jobsApi.get(url);
  return response.data;
};

export const addNewJob = async (jobObj) => {
  await delay();
  const response = await jobsApi.post(jobsUrlEndpoint, jobObj);
  return response.data;
};

export const updateJob = async (job) => {
  await delay();
  const response = await jobsApi.patch(`${jobsUrlEndpoint}/${job.id}`, job);
  return response.data;
};

export const deleteJob = async ({ id }) => {
  await delay();
  const response = await jobsApi.delete(`${jobsUrlEndpoint}/${id}`);
  return response.data;
};
