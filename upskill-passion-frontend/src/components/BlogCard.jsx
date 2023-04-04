import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

const BlogCard = ({ blog }) => {
  // console.log(blog);
  return (
    <main className="blogcard">
      <p className="font-bold text-[25px]">
        <Link to={`/blogs/${blog?.id}`}>
          {blog?.title}&nbsp;{" "}
          <span className="inline-block">
            <BsArrowUpRight size={10} />
          </span>
        </Link>
      </p>
      {/* <p className="font-normal text-sm">{job?.company_name}</p> */}
      <p className="text-lg">
        <strong>Posted By:</strong> {blog?.posted_by}
      </p>
      <p className="text-lg">
        <strong>Tags:</strong> {blog?.tags.join(",")}
      </p>
      <p className="text-lg tracking-normal leading-6">
        {blog?.content.substring(0, 500)}...
      </p>
      <p className="text-lg">
        <strong>Minimum Qualification:</strong> {blog?.min_qualification}
      </p>
      <p className="text-lg">
        <strong>Liked by:</strong> {blog?.upvote_count}
      </p>
      {/* <p className="text-lg">
        <strong>Downvote Count:</strong> {blog?.downvote_count}
      </p> */}
      {/* <p className="text-lg">
        <strong>Experience Required:</strong> {job?.experience}
      </p> */}
      {/* <p className="text-lg">
        <strong>Location:</strong> {job?.location?.city}, {job?.location?.state}
        , {job?.location?.country}
      </p> */}

      {/* <p className="text-lg">
        <strong>Estimated Salary:</strong> {job?.salary} INR
      </p> */}
    </main>
  );
};
export default BlogCard;

/**
 * content
: 
"Beekeeping"
downvote_count
: 
19
id
: 
"hWUObpQntpFaLXqHMOyY"
min_qualification
: 
"HSC"
posted_by
: 
"Satyam Gupta"
tags
: 
Array(3)
0
: 
"Beekeeping"
1
: 
"Honeybee"
2
: 
"Beehive"
length
: 
3
[[Prototype]]
: 
Array(0)
time
: 
_nanoseconds
: 
554000000
_seconds
: 
1680361484
[[Prototype]]
: 
Object
title
: 
"Beginner's Introduction to Beekeeping: A brief Guide"
upvote_count
: 
264
username
: 
"stymgupta"
usertype
: 
"student"
 */
