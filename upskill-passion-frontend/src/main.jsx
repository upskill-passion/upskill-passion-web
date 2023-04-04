import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import "./index.css";

import { preload } from "swr";
import { getJobs, jobsUrlEndpoint as jobsCacheKey } from "./api/jobsApi";
import {
  getBlogs,
  getBlogTags,
  blogsUrlEndpoint as blogsCacheKey,
} from "./api/blogsApi";

import { AuthProvider } from "./context/AuthProvider";
import { QueryContextProvider } from "./context/QueryContextProvider";
import { FilterdJobDataProvider } from "./context/FilterJobDataProvider";
import { FilterdBlogDataProvider } from "./context/FilterBlogDataProvider";
import { QuestionDataProvider } from "./context/QuestionDataProvider";

preload(jobsCacheKey, getJobs);
preload(blogsCacheKey, getBlogs);
preload("/blogtags", getBlogTags);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <QueryContextProvider>
          <FilterdBlogDataProvider>
            <FilterdJobDataProvider>
              <QuestionDataProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </QuestionDataProvider>
            </FilterdJobDataProvider>
          </FilterdBlogDataProvider>
        </QueryContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
