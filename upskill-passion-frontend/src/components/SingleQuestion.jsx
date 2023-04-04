import { useState, useEffect } from "react";
import SingleReply from "./SingleReply";
// import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "@mui/material/Button";
import useQuery from "../hooks/useQuery";
import { TextField } from "@mui/material";
import useQuestion from "../hooks/useQuestionData";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SingleQuestion({ ind, question }) {
  const [allReplies, setAllReplies] = useState(false);
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [answer, clickAnswer] = useState(false);
  const [addAnswer, setAddAnswer] = useState("");
  const [convertedContent, setConvertedContent] = useState(null);
  const { query } = useQuery();
  const { auth } = useAuth();

  // useEffect(() => {
  //   let html = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(html);
  // }, [editorState]);

  const { setQuestions } = useQuestion();

  async function handleSubmit() {
    // try {
    //   const response = await axios.patch(
    //     `/save/${jobId}`,
    //     JSON.stringify({
    //       action: "saved-job",
    //     }),
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${auth.accessToken}`,
    //       },
    //     }
    //   );

    //   console.log("Response Data:  ", response?.data);
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const sendTo = JSON.stringify({
        answer: addAnswer,
      });
      const response = await axios.post(
        `http://localhost:8080/answer/${question.id}`,
        sendTo,
        customConfig
      );

      async function getQuestions() {
        const data = await axios({
          method: "get",
          url: "http://localhost:8080/queries",
        });
        setQuestions(data.data);
      }
      getQuestions();
      toast.success("Success! Question Added.", {
        duration: 2500,
        icon: "🎉",
      });
      setAddAnswer("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <div>
          <Toaster toastOptions={{ position: "top-center" }} />
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#3B5998",
            padding: "5px",
            borderRadius: "25px",
            display:
              query !== "" && !question.question.includes(query) ? "none" : "",
          }}
        >
          {query === "" && (
            <p
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                color: "white",
              }}
            >
              {question.question}
            </p>
          )}
          {query !== "" && (
            <p
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                color: "white",
              }}
            >
              <span>
                {question.question.substr(0, question.question.indexOf(query))}
              </span>
              <span style={{ color: "black" }}>
                {question.question.substr(
                  question.question.indexOf(query),
                  query.length
                )}
              </span>
              <span>
                {question.question.substr(
                  question.question.indexOf(query) + query.length
                )}
              </span>
            </p>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {question.answers.map((key, index) => {
            return (
              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "#EBECF0",
                  padding: "10px",
                  borderRadius: "5px",
                  display:
                    query === "" && ((index === 0 && !allReplies) || allReplies)
                      ? ""
                      : query !== "" && !question.question.includes(query)
                      ? "none"
                      : query !== "" && question.question.includes(query)
                      ? ""
                      : "none",
                }}
                key={key.id}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    fontSize: "14px",
                    color: "#3B5998",
                  }}
                >
                  {key.posted_by}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "2px",
                    fontWeight: "bold",
                  }}
                >
                  {key.usertype}
                </p>
                <SingleReply
                  answer={key.answer}
                  bookMark={false}
                  laterSaved={false}
                  upvotes={key.upvote_count}
                  downvotes={key.downvote_count}
                  replyToReplies={key.replies}
                  questionid={question.id}
                  answerid={key.id}
                />
              </div>
            );
          })}
          {answer && (
            <div style={{ marginLeft: "10px" }}>
              <TextField
                style={{ width: "70%", marginTop: "10px" }}
                id="outline-basic"
                size="small"
                multiline
                label="Enter the question"
                value={addAnswer}
                onChange={(e) => {
                  setAddAnswer(e.target.value);
                }}
                inputProps={{
                  style: {
                    backgroundColor: "white",
                  },
                }}
                InputProps={{
                  rows: 5,
                }}
              />
            </div>
          )}
          <div
            style={{ marginLeft: "20px", marginTop: "5px", display: "flex" }}
          >
            <p>
              <span
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  color: "#3B5998",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginRight: "10px",
                  display:
                    query !== "" && !question.question.includes(query)
                      ? "none"
                      : "",
                }}
                onClick={() => {
                  clickAnswer(!answer);
                }}
              >
                {answer ? "cancel" : "add answer"}
              </span>
              {answer && (
                // <button
                //   style={{
                //     display: "block",
                //     padding: "5px",
                //     marginTop: "10px",
                //     backgroundColor: "green",
                //     borderRadius: "5%",
                //     color: "white",
                //   }}
                //   color="white"
                // >
                //   Save
                // </button>
                <Button
                  style={{
                    display: "block",
                    marginTop: "10px",
                    backgroundColor: "green",
                  }}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  Save
                </Button>
              )}
            </p>
            {query === "" && (
              <p>
                <span
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                    color: "#3B5998",
                    cursor: "pointer",
                    textDecoration: "underline",
                    display:
                      query !== "" && !question.question.includes(query)
                        ? "none"
                        : "",
                  }}
                  onClick={() => {
                    setAllReplies(!allReplies);
                  }}
                >
                  {allReplies ? "hide replies" : "show all replies"}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
