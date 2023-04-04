// import { useContext } from "react";
// import JobContext from "../context/JobDataProvider";

import useSWR from "swr";
import { getJobs, jobsUrlEndpoint as cacheKey } from "../api/jobsApi";

// localhost:8080/jobs?jobtype=permanent,Temporary&min_education=Masters,Bachelors&min_experience=0&max_experience=5

const useJobData = (queryString = "") => {
  const { isLoading, error, data } = useSWR(
    `${cacheKey}${queryString}`,
    getJobs
  );
  return {
    jobs: data,
    isLoading,
    error,
  };
};

export default useJobData;
