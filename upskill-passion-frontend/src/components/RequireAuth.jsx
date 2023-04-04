import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "./Footer";
import Header from "./Header";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // console.log(allowedRoles);
  // console.log(auth?.usertype);

  return allowedRoles?.includes(auth?.usertype) ? (
    <div className="App">
      <div className="w-full bg-[#3b5998] sm:px-16 px-6">
        <Header />
      </div>
      <div className="flex flex-col w-full justify-center items-start">
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
