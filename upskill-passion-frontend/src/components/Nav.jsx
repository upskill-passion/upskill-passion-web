import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Nav = ({ toggle }) => {
  let margin = toggle ? "mb-4" : "mr-10";
  const { auth } = useAuth();

  const isRecruiter = auth?.usertype === "recruiter";
  // console.log(isRecruiter);

  // const token = auth?.accessToken;

  // const getPublishedJobs = async () => {
  //   const response = await axios.get("/jobs/published", {
  //     headers: { Authorization: `Bearer ${token}` },
  //     withCredentials: true,
  //   });
  //   return response.data;
  // };

  // getPublishedJobs().then((data) => console.log(data));

  const content = navLinks.map((nav) => {
    if (isRecruiter && nav.id === "jobs") return null;
    if (!isRecruiter && nav.id === "postedJobs") return null;
    return (
      <li
        key={nav.id}
        className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${margin}`}
      >
        {nav.id === "postedJobs" ? (
          <Link to={`/users/${auth.userId}/${nav.id}`}>{nav.title}</Link>
        ) : (
          <Link to={`/${nav.id}`}>{nav.title}</Link>
        )}
      </li>
    );
  });
  return content;
};
export default Nav;
