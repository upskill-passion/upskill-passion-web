import { Box } from "@mui/material";
import JobCard from "./JobCard";

import useJobData from "../hooks/useJobData";
import useFilterJobQuery from "../hooks/useFilterJobQuery";

const Jobs = () => {
  const { queryString } = useFilterJobQuery();
  const { jobs, isLoading, error } = useJobData(queryString);
  // console.log("Jobs: ", jobs);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <div className="jobsgrid">
        {jobs?.map((item, idx) => (
          <Box key={idx}>
            <JobCard job={item} />
          </Box>
        ))}
      </div>
    );
  }

  return content;
};
export default Jobs;
