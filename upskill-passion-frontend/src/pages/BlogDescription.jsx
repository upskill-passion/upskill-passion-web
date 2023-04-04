import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  BsBookmarkCheckFill,
  BsBookmarkCheck,
  BsArrowUpRight,
} from "react-icons/bs";
import { BiUpvote, BiDownvote } from "react-icons/bi";

import axios from "../api/axios";
import useBlogsData from "../hooks/useBlogsData";
import useAuth from "../hooks/useAuth";

function firebaseTimeToDate(time) {
  const fireBaseTime = new Date(
    time._seconds * 1000 + time._nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  return date;
}

const BlogDescription = () => {
  const [checked, setChecked] = useState(false);
  const { blogId } = useParams();

  const { blogs, isLoading, error } = useBlogsData();
  // console.log("Blogs: ", blogs);
  const { auth } = useAuth();

  const handleOnSave = async (e) => {
    e.preventDefault();

    setChecked((prevState) => {
      return !prevState;
    });

    try {
      const response = await axios.patch(
        `/save/${blogId}`,
        JSON.stringify({
          action: "saved-blog",
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
    const blog = blogs?.find((blogObj) => blogObj.id === blogId);
    console.log("Blog", blog);

    if (!blog) {
      content = (
        <p className="grid place-content-center p-5 text-3xl">
          No Blog found with id:{" "}
          <strong className="inline-block">{blogId}</strong>
        </p>
      );
    } else {
      content = (
        <main className="text-left p-20">
          <p className="font-bold text-[35px]">{blog?.title}&nbsp; </p>
          <p className="font-normal italic text-[16px]">
            Posted By:{" "}
            <Link
              to={`/users/${blog?.username}`}
              className="text-red-700 hover:underline capitalize"
            >
              {blog?.posted_by}
            </Link>
            <span className="text-green-500 text-[20px] capitalize font-normal">
              &nbsp; &nbsp; {blog?.usertype}
            </span>
          </p>
          <p className="font-normal italic text-[16px]">
            Posted On: {firebaseTimeToDate(blog?.time)}
          </p>
          <p>
            <strong>Minimum Qualification:</strong> {blog?.min_qualification}
          </p>
          <p className="font-semibold text-[18px] mb-3">
            Tags: {blog?.tags.join(", ")}
          </p>

          <p className="text-[22px] font-normal tracking-normal leading-6 mb-4">
            {blog?.content}
          </p>

          <div className="flex sm:flex-row flex-col sm:items-center sm:justify-start items-start gap-3 my-2">
            <div className="flex flex-row gap-3">
              <button
                type="button"
                className="flex text-green-600 border-green-600 p-2 border-2 gap-3"
                title="Upvote"
              >
                {blog?.upvote_count}{" "}
                <BiUpvote fill="green" color="green" size={25} />
              </button>
              <button
                type="button"
                className="flex text-red-600 border-red-600 p-2 border-2 gap-3"
                title="Downvote"
              >
                {blog?.downvote_count}{" "}
                <BiDownvote fill="red" color="red" size={25} />
              </button>
            </div>
            <button
              type="button"
              className="border-blue-500 border-2 text-blue-500 w-[140px] h-[45px] px-2 rounded-sm flex flex-row items-center justify-center gap-4"
              onClick={handleOnSave}
              title="Save Blog"
            >
              Save Blog
              {checked ? <BsBookmarkCheckFill /> : <BsBookmarkCheck />}
            </button>
          </div>
        </main>
      );
    }
  }
  return content;
};
export default BlogDescription;
