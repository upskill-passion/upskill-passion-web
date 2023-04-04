import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";
const LOGIN_URL = "/login";

import "../css/Authentication.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loginBy, setLoginBy] = useState("generaluser");
  const circleStyle = {
    backgroundColor: "white",
    borderRadius: "50%",
    height: "10px",
    width: "10px",
    display: "inline-block",
    marginRight: "10px",
  };

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent reloading
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pswd: password, type: loginBy }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // console.log("Response Data:  ", response?.data);

      const { token: accessToken } = response?.data;

      const decoded = jwt_decode(accessToken);
      // console.log("Decoded Token: ", decoded);

      setAuth({
        email,
        password,
        username: decoded.username,
        accessToken,
        userId: decoded.id,
        usertype: decoded.usertype,
      });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  // console.log("Error Message: ", errMsg);
  // console.log("Auth: ", auth);

  return (
    <form onSubmit={handleSubmit}>
      <div className="login">
        <div className="loginBackground">
          <div style={{ marginLeft: "20px", marginTop: "20px" }}>
            <p>
              <span style={{ color: "white", display: "block" }}>
                User Functionality
              </span>
              <div>
                <span style={{ display: "inline-block" }}>
                  Register and login to the platform
                </span>
              </div>
              <div>
                <span style={{ display: "inline-block" }}>
                  Access Common Functionalities and special functionalities
                  based on their role
                </span>
              </div>
              <span style={{ color: "white", display: "block" }}>
                Common Functionalities
              </span>
              <div>
                <span style={{ display: "inline-block" }}>
                  Blogs: View and filter blogs using tags, minimum
                  qualification, upvote count, and date posted. Post new blogs
                  and view the profile of the user who posted the blog.
                </span>
              </div>
              <div>
                <span style={{ display: "inline-block" }}>
                  Jobs: View and filter job opportunities based on minimum
                  qualification, job type, and experience required to apply.
                  Click on job title to see more information.
                </span>
              </div>
              <span style={{ color: "white", display: "block" }}>
                Recruiter Functionality
              </span>
              <div>
                <span style={{ display: "inline-block" }}>
                  View and update all jobs posted by them.
                </span>
              </div>
              <div>
                <span style={{ display: "inline-block" }}>
                  Ability to view all applicants who applied for the job.
                </span>
              </div>
            </p>
            <div>
              <p
                style={{
                  fontSize: "20px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                Don't have an account?
              </p>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Button
                  onClick={() => navigate("/register")}
                  style={{ backgroundColor: "white", marginBottom: "20px" }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            borderRadius: "25px",
            padding: "30px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              boxShadow: "0px 3px 14px",
              padding: "30px",
              borderRadius: "50px",
            }}
          >
            <div>
              <h1
                style={{
                  color: "#3B5998",
                  marginLeft: "120px",
                  fontSize: "20px",
                }}
              >
                Log In
              </h1>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  marginRight: "40px",
                  fontSize: "16px",
                  display: "inline-block",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Email
              </p>
              <TextField
                id="outline-basic"
                size="small"
                label="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "30px" }}>
              <p
                style={{
                  fontSize: "16px",
                  display: "inline-block",
                  marginTop: "-5px",
                  marginBottom: "15px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Password
              </p>

              <TextField
                id="outline-basic"
                size="small"
                label="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  marginBottom: "6px",
                  fontWeight: "bolder",
                  marginRight: "20px",
                  marginTop: "8.5px",
                }}
              >
                Role{" "}
              </p>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={loginBy}
                  onChange={(e) => setLoginBy(e.target.value)}
                >
                  <FormControlLabel
                    value="generaluser"
                    control={<Radio />}
                    label="General User"
                  />
                  <FormControlLabel
                    value="recruiter"
                    control={<Radio />}
                    label="Recruiter"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#3B5998",
                  marginTop: "10px",
                  marginBottom: "20px",
                  marginLeft: "120px",
                }}
                type="submit"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* {toggle && (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <div className="login">
            <div className="loginBackground">
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Don't have an account?
                  </p>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setToggle(false);
                      }}
                      style={{ backgroundColor: "white", marginBottom: "20px" }}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderRadius: "25px",
                padding: "30px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  boxShadow: "0px 3px 14px",
                  padding: "30px",
                  borderRadius: "50px",
                }}
              >
                <div>
                  <h1 style={{ color: "#3B5998", marginLeft: "120px" }}>
                    Log In
                  </h1>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <p
                    style={{
                      marginRight: "40px",
                      fontSize: "16px",
                      display: "inline-block",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </p>
                  <TextField
                    id="outline-basic"
                    size="small"
                    label="Enter your email"
                    value={email}
                    onChange={(e) => setEmailLogin(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      display: "inline-block",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                  >
                    Password
                  </p>

                  <TextField
                    id="outline-basic"
                    size="small"
                    label="Enter your password"
                    type="password"
                    value={userNamePasswordLogin}
                    onChange={(e) => setUserNamePasswordLogin(e.target.value)}
                  />
                </div>

                <div>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#3B5998",
                      marginTop: "10px",
                      marginBottom: "20px",
                      marginLeft: "120px",
                    }}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      )} */}
      {/* {!toggle && (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <div className="signup">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderRadius: "25px",
                padding: "30px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  boxShadow: "0px 3px 14px",
                  padding: "30px",
                  borderRadius: "50px",
                }}
              >
                <div>
                  <h1
                    style={{
                      color: "#3B5998",
                      marginLeft: "80px",
                    }}
                  >
                    Sign Up
                  </h1>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p
                    style={{
                      marginRight: "10px",
                      fontSize: "16px",
                      display: "inline-block",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </p>
                  <TextField
                    id="outline-basic"
                    size="small"
                    label="Enter your name"
                    value={nameRegister}
                    onChange={(e) => setNameRegister(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p
                    style={{
                      marginRight: "10px",
                      fontSize: "16px",
                      display: "inline-block",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </p>
                  <TextField
                    id="outline-basic"
                    size="small"
                    label="Enter your email"
                    value={emailRegister}
                    onChange={(e) => setEmailRegister(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: "20px", zIndex: 10 }}>
                  <p
                    style={{
                      marginRight: "10px",
                      fontSize: "16px",
                      display: "inline-block",
                      marginTop: "-5px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      marginLeft: "-6px",
                    }}
                  >
                    Date of birth
                  </p>
                  <div style={{ zIndex: 100 }}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "30px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      display: "block",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      marginLeft: "56px",
                      fontWeight: "bold",
                      zIndex: -1,
                    }}
                  >
                    Temporaray Address
                  </p>

                  <TextField
                    id="outline-basic"
                    size="small"
                    // label="Enter your Temporary Address"
                    multiline
                    InputProps={{
                      maxRows: 2,
                    }}
                    style={{
                      width: "300px",
                    }}
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      display: "block",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      marginLeft: "56px",
                      fontWeight: "bold",
                      zIndex: -1,
                    }}
                  >
                    Permanent Address
                  </p>
                  <TextField
                    id="outline-basic"
                    size="small"
                    // label="Enter your Permanent Address"
                    multiline
                    InputProps={{
                      maxRows: 2,
                    }}
                    style={{
                      width: "300px",
                    }}
                    value={permAddress}
                    onChange={(e) => setPermAddress(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      display: "block",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      marginLeft: "85px",
                      fontWeight: "bold",
                    }}
                  >
                    Password
                  </p>

                  <TextField
                    id="outline-basic"
                    size="small"
                    label="Enter your password"
                    type="password"
                    style={{
                      width: "300px",
                    }}
                    value={passwordRegister}
                    onChange={(e) => setPasswordRegister(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      display: "block",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      marginLeft: "56px",
                      fontWeight: "bold",
                    }}
                  >
                    Confirm Password
                  </p>
                  <TextField
                    id="outline-basic"
                    size="small"
                    label="Re-enter your password"
                    type="password"
                    style={{
                      width: "300px",
                    }}
                    value={passwordConfirmRegister}
                    onChange={(e) => setPasswordConfirmRegister(e.target.value)}
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#3B5998",
                      marginTop: "10px",
                      marginBottom: "20px",
                      marginLeft: "80px",
                    }}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
            <div className="signUpBackground">
              <div
                style={{
                  marginLeft: "20px",
                }}
              >
                <p style={{ marginTop: "25px" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Already have a account?
                  </p>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <Button
                      style={{ backgroundColor: "white", marginBottom: "25px" }}
                      onClick={() => setToggle(true)}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      )} */}
    </form>
  );
}
