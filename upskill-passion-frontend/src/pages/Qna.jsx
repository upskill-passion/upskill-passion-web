import MenuIcon from "@mui/icons-material/Menu";
import { Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

import { useEffect, useState } from "react";
import SingleQuestion from "../components/SingleQuestion";
import "../css/ListArchitecture.css";
import useQuery from "../hooks/useQuery";
import useQuestion from "../hooks/useQuestionData";

export default function Qna() {
  const [currentType, setCurrentType] = useState("@all");
  const [similarQuestion, setSimilarQuestion] = useState(false);
  const { query, setQuery } = useQuery();
  const [text, setText] = useState("");
  const [textChoose, setTextChoose] = useState(false);
  const { questions, setQuestions } = useQuestion();

  useEffect(() => {
    async function getQuestions() {
      const data = await axios({
        method: "get",
        url: "http://localhost:8080/queries",
      });
      setQuestions(data.data);
    }
    getQuestions();
  }, []);

  return (
    <>
      <div>
        <div style={{ display: textChoose ? "none" : "" }}>
          <div className="listArchi">
            <div className="architectureSearch">
              <div style={{ marginTop: "10px", marginLeft: "25px" }}>
                <TextField
                  id="outline-basic"
                  label="Search for a query word"
                  variant="outlined"
                  style={{ width: "350px", borderRadius: "50px !important" }}
                  size="small"
                  inputProps={{
                    style: {
                      borderRadius: "50px",
                    },
                  }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flexList">
                <div
                  style={{
                    backgroundColor:
                      currentType === "@all" ? "#3B5998" : "#EBECF0",
                    textAlign: "center",
                    padding: "10px",
                    color: currentType === "@all" ? "white" : "black",
                    borderRight: "1px solid #3B5998",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                    marginTop: "10px",
                    borderRadius: "5%",
                    marginRight: "10px",
                    // padding: "5px",
                  }}
                  onClick={() => {
                    if (currentType !== "@all") setCurrentType("@all");
                  }}
                >
                  <span style={{ fontSize: "14px" }}>All Questions</span>
                </div>
                <div
                  style={{
                    backgroundColor:
                      currentType === "@my" ? "#3B5998" : "#EBECF0",
                    textAlign: "center",
                    padding: "10px",
                    color: currentType === "@my" ? "white" : "black",
                    borderRight: "1px solid #3B5998",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                    marginTop: "10px",
                    borderRadius: "5%",
                    marginRight: "10px",
                    // padding: "5px",
                  }}
                  onClick={() => {
                    if (currentType !== "@my") setCurrentType("@my");
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Saved for later</span>
                </div>
                <div
                  style={{
                    backgroundColor:
                      currentType === "@saved" ? "#3B5998" : "#EBECF0",
                    textAlign: "center",
                    padding: "10px",
                    color: currentType === "@saved" ? "white" : "black",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                    marginTop: "10px",
                    borderRadius: "5%",
                    // padding: "5px",
                  }}
                  onClick={() => {
                    if (currentType !== "@saved") setCurrentType("@saved");
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Posted questions</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "5px", marginLeft: "25px" }}>
              {questions?.map((question, index) => {
                return (
                  <SingleQuestion key={index} ind={index} question={question} />
                );
              })}
            </div>
            {!similarQuestion && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setSimilarQuestion(true)}
              >
                <MenuIcon />
              </div>
            )}
            {similarQuestion && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setSimilarQuestion(false)}
              >
                <CloseIcon />
              </div>
            )}
          </div>
          {similarQuestion && (
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <div
                style={{
                  position: "fixed",
                  right: "30px",
                  width: "20%",
                  height: "92%",
                  top: "20px",
                  border: "1px solid black",
                  zIndex: "2",
                  backgroundColor: "#EBECF0",
                }}
              >
                <p
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginTop: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Similiar questions
                </p>
                <a
                  style={{ margin: "10px", display: "block", fontSize: "14px" }}
                  href="#"
                >
                  What is the full form of G20?
                </a>
                <a
                  style={{ margin: "10px", display: "block", fontSize: "14px" }}
                  href="#"
                >
                  Where first meeting of G20 2023 happened in India?
                </a>
                <a
                  style={{ margin: "10px", display: "block", fontSize: "14px" }}
                  href="#"
                >
                  Is it true that 2/3 of world GDP is contributed by countries
                  of G20?
                </a>
              </div>
            </Slide>
          )}
        </div>
        <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
          <Button onClick={() => setTextChoose(true)} variant="contained">
            Add question +{" "}
          </Button>
        </div>
        {textChoose && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#EBECF0",
                height: "250px",
                width: "375px",
                marginTop: "100px",
                zIndex: 2,
                borderRadius: "25px",
                border: "1px solid black",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "#3B5998",
                  fontWeight: "bold",
                  marginTop: "10px",
                  marginLeft: "35%",
                }}
              >
                Add Question
              </p>
              <TextField
                style={{
                  width: "275px",
                  marginLeft: "17.5%",
                  marginTop: "20px",
                }}
                id="outline-basic"
                multiline
                maxRows={4}
                label="Enter your question here"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div
                style={{
                  marginTop: "25px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      setTextChoose(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "green" }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
