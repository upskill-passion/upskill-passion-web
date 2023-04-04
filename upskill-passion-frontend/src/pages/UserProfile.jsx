import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="flex flex-col gap-5 p-5 text-xl">
      <Link to="postedJobs" className="hover:underline">
        <button type="button">See Posted Jobs</button>
      </Link>

      <Link to="postedBlogs" className="hover:underline">
        <button type="button">See Posted Blogs</button>
      </Link>
    </div>
  );
};
export default UserProfile;
