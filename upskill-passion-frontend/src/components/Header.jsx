import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";

import { close, logo, menu } from "../assets";
import Nav from "./Nav";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    // console.log("Hello");
    setAuth({});
    navigate("/");
  };

  // console.log(auth);

  const content = (
    <header>
      <nav className="w-full flex py-2 justify-between items-center">
        <Link to="/">
          <img src={logo} alt="upskill-passion-logo" className="w-[60px]" />
        </Link>

        {auth?.email ? (
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <Nav />
            <li className="font-poppins font-normal cursor-pointer text-white mt-2 mr-3">
              <button
                type="button"
                onClick={() => navigate("/me")}
                title="My Profile"
              >
                <BiUser size={25} color="white" />
              </button>
            </li>
            <li className="font-poppins font-normal cursor-pointer  text-white mt-2 ml-3">
              <button type="button" onClick={logout} title="Log out">
                <AiOutlineLogout size={25} color="white" />
              </button>
            </li>
          </ul>
        ) : (
          <Link
            to="/login"
            className="flex flex-row items-center gap-4 p-2 text-xl text-white"
          >
            <span className="sm:flex hidden underline font-bold">
              Login as Existing user
            </span>
            <BiUser title="Sign in" size={30} color="white" />
          </Link>
        )}

        {auth?.email && (
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />
            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 bg-[#333] absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
            >
              <ul className="list-none flex justify-end items-start flex-col flex-1">
                <Nav toggle={toggle} />
                <li className="font-poppins font-normal cursor-pointer text-[px] text-white ">
                  <button
                    className="flex items-center gap-2"
                    type="button"
                    onClick={logout}
                    title="Log out"
                  >
                    Logout <AiOutlineLogout size={20} color="white" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );

  return content;
};
export default Header;
