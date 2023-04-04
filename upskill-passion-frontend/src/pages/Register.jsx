import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, TextField } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import toast, { Toaster } from "react-hot-toast";

import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
const REGISTER_URL = "/register";

const Register = () => {
  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordConfirmRegister, setPasswordConfirmRegister] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [registerBy, setRegisteredBy] = useState("generaluser");

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          name: nameRegister,
          pswd: passwordRegister,
          email: emailRegister,
          type: registerBy,
          DOB: startDate.toLocaleDateString(),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // console.log("Response Data:  ", response?.data);

      const { token: accessToken } = response?.data;

      const decoded = jwt_decode(accessToken);
      // console.log("Decoded Token: ", decoded);

      setAuth({
        email: emailRegister,
        password: passwordRegister,
        username: decoded.username,
        accessToken,
        userId: decoded.id,
        usertype: decoded.usertype,
      });

      //clear state and controlled inputs
      setNameRegister("");
      setPasswordRegister("");
      setEmailRegister("");
      setPasswordConfirmRegister("");

      toast.success("Success! Registered Successfully.", {
        duration: 2500,
        icon: "🎉",
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.status === 409) {
        setErrMsg("Username Taken");
        toast.error("Email already Taken!!", {
          duration: 2500,
          icon: "🚫",
        });
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  // console.log("Error Message: ", errMsg);
  // console.log("Auth: ", auth);

  return (
    <>
      <div>
        <Toaster toastOptions={{ position: "top-center" }} />
      </div>
      <form className="signup" onSubmit={handleSubmit}>
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
                  marginLeft: "100px",
                  fontSize: "20px",
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
                  value={registerBy}
                  onChange={(e) => setRegisteredBy(e.target.value)}
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

            <div style={{ marginTop: "30px" }}>
              <p
                style={{
                  fontSize: "16px",
                  display: "block",
                  marginTop: "-5px",
                  marginBottom: "15px",
                  marginLeft: "100px",
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
                  marginLeft: "75px",
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
                type="submit"
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
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Register;
