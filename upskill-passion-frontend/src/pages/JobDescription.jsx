import { useParams, Link } from "react-router-dom";
import useJobData from "../hooks/useJobData";
import {
  BsBookmarkCheckFill,
  BsBookmarkCheck,
  BsArrowUpRight,
} from "react-icons/bs";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function firebaseTimeToDate(time) {
  const fireBaseTime = new Date(
    time._seconds * 1000 + time._nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  return date;
}

const JobDescription = () => {
  const [checked, setChecked] = useState(false);
  const { jobId } = useParams();
  // console.log(id);

  const { jobs, isLoading, error } = useJobData();
  // console.log("Jobs: ", typeof jobs[0].tags);

  const { auth } = useAuth();

  const handleOnSave = async (e) => {
    e.preventDefault();

    setChecked((prevState) => {
      return !prevState;
    });

    try {
      const response = await axios.patch(
        `/save/${jobId}`,
        JSON.stringify({
          action: "saved-job",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      console.log("Response Data:  ", response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    const job = jobs?.find((jobObj) => jobObj.id === jobId);

    if (!job) {
      content = (
        <p className="grid place-content-center p-5 text-3xl">
          No Job found with id:{" "}
          <strong className="inline-block">{jobId}</strong>
        </p>
      );
    } else {
      content = (
        <main className="text-left p-20">
          <p className="font-bold text-[35px]">{job?.title}&nbsp; </p>
          <p className="font-normal italic text-[16px]">
            Posted By:{" "}
            <Link
              to={`/users/${job.posted_by}`}
              className="text-red-700 hover:underline capitalize"
            >
              {job?.posted_by_name}
            </Link>
          </p>
          <p className="font-normal italic text-[16px]">
            Posted On: {firebaseTimeToDate(job?.posting_date)}
          </p>
          <p className="text-[25px] font-normal leading-8">
            {job?.description}
          </p>
          <p className="text-green-500 text-[20px] font-normal inline-block">
            {job?.company_name}
          </p>
          <div className="px-3 py-2 mx-5 rounded-md bg-blue-500 text-white font-bold my-3 inline-block capitalize">
            {job?.jobtype}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[23px]">
            <div>
              <p>
                <strong>Minimum Qualification:</strong> {job?.MinEducation}
              </p>
              <p>
                <strong>Positions Available:</strong> {job?.positions}
              </p>
              <p>
                <strong>Experience Required:</strong> {job?.experience} years
              </p>
              <p>
                <strong>Industry:</strong> {job?.industry}
              </p>
              {/* <p>
                <strong>Location:</strong> {job?.location?.city},{" "}
                {job?.location?.state}, {job?.location?.country}
              </p> */}
            </div>

            <div>
              {/* <p>
                <strong>Deadline:</strong> {job?.lastDate.substring(0, 10)}
              </p> */}
              <p>
                <strong>Estimated Salary:</strong> {job?.salary} INR
              </p>
              {/* <p>
                <strong>Tags:</strong> {job?.tags.join(",")}
              </p> */}
            </div>
          </div>

          <div className="flex flex-col gap-3 my-2">
            <button
              type="button"
              className="border-blue-500 border-2 text-blue-500 w-[160px] h-[40px] px-2 rounded-sm flex flex-row items-center gap-4"
              onClick={handleOnSave}
            >
              Save for Later
              {checked ? <BsBookmarkCheckFill /> : <BsBookmarkCheck />}
            </button>
            <button
              type="button"
              className="border-red-500 border-2 text-red-500 w-[160px] h-[40px] px-2 rounded-sm"
            >
              <a
                href="https://www.google.com/"
                className="no-underline flex flex-row items-center gap-4"
                target="_blank"
              >
                Apply For Job
                <BsArrowUpRight />
              </a>
            </button>
          </div>
        </main>
      );
    }
  }

  return content;
};
export default JobDescription;
