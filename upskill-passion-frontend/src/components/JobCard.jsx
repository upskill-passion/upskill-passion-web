import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

const JobCard = ({ job }) => {
  // console.log(job);
  return (
    <main className="jobcard">
      <p className="font-bold text-[25px]">
        <Link to={`/jobs/${job?.id}`}>
          {job?.title}&nbsp;{" "}
          <span className="inline-block">
            <BsArrowUpRight size={10} />
          </span>
        </Link>
      </p>
      <p className="font-normal text-sm">{job?.company_name}</p>
      <div className="px-3 py-2 rounded-md bg-blue-500 text-white font-bold my-3 inline-block">
        {job?.jobtype}
      </div>
      <p className="text-lg">
        <strong>Minimum Qualification:</strong> {job?.MinEducation}
      </p>
      <p className="text-lg">
        <strong>Positions Available:</strong> {job?.positions}
      </p>
      <p className="text-lg">
        <strong>Experience Required:</strong> {job?.experience}
      </p>
      {/* <p className="text-lg">
        <strong>Location:</strong> {job?.location?.city}, {job?.location?.state}
        , {job?.location?.country}
      </p> */}
      {/* <p className="text-lg">
        <strong>Deadline:</strong> {job?.lastDate.substring(0, 10)}
      </p> */}
      <p className="text-lg">
        <strong>Estimated Salary:</strong> {job?.salary} INR
      </p>
      {/* <p className="text-lg">
        <strong>Tags:</strong> {job?.industry.join(",")}
      </p> */}
    </main>
  );
};
export default JobCard;
