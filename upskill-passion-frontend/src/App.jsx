import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import JobDescription from "./pages/JobDescription";
import Unauthorized from "./pages/Unauthorized";
import Missing from "./pages/Missing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Qna from "./pages/Qna";
import BlogsPage from "./pages/BlogsPage";
import RequireAuth from "./components/RequireAuth";
import CreateBlog from "./pages/CreateBlog";
import BlogDescription from "./pages/BlogDescription";

import PostedBlogs from "./pages/PostedBlogs";
import PostedJobs from "./pages/PostedJobs";
import UserProfile from "./pages/UserProfile";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public Routes*/}
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route
          element={<RequireAuth allowedRoles={["generaluser", "recruiter"]} />}
        >
          <Route path="me" element={<MyProfile />} />
          <Route path="blogs">
            <Route index element={<BlogsPage />} />
            <Route path="new" element={<CreateBlog />} />
            <Route path=":blogId" element={<BlogDescription />} />
          </Route>

          <Route path="qna" element={<Qna />} />
          <Route path="users">
            <Route path=":userId">
              <Route index element={<UserProfile />} />
              <Route path="postedJobs" element={<PostedJobs />} />
              <Route path="postedBlogs" element={<PostedBlogs />} />
            </Route>
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["generaluser"]} />}>
          <Route path="jobs">
            <Route index element={<JobPage />} />
            <Route path=":jobId" element={<JobDescription />} />
          </Route>
        </Route>

        {/* catch all essentially 404 page*/}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
