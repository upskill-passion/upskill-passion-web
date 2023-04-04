import useSWR from "swr";
import { getPostedJobs } from "../api/jobsApi";
import JobCard from "../components/JobCard";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const PostedJobs = () => {
  const { userId } = useParams();
  const {
    isLoading,
    error,
    data: jobs,
  } = useSWR(`/postedJobs/${userId}`, getPostedJobs);

  console.log("jobs: ", jobs);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <div className="jobsgrid">
        {Array.isArray(jobs) && jobs?.length ? (
          jobs?.map((item, idx) => (
            <Box key={idx}>
              <JobCard job={item} />
            </Box>
          ))
        ) : (
          <p>This user is a general user, can not post jobs.</p>
        )}
      </div>
    );
  }

  return content;
};
export default PostedJobs;
