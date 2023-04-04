import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { Qualifications } from "../constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function BlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [minQualificaton, setMinQualification] = useState("");
  const [numberTags, setNumberTags] = useState(0);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const navigate = useNavigate();
  const { auth } = useAuth();

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleDelete = (tagToDelete) => () => {
    const val = numberTags;
    setNumberTags(val - 1);
    setTags((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
  };

  const onChangeQualification = (event) => {
    const value = event.target.value;
    setMinQualification(value);
  };

  const selectedTags = tags?.map((tag) => {
    return tag?.label;
  });

  // console.log(selectedTags);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && content && minQualificaton && selectedTags.length) {
      try {
        const response = await axios.post(
          "/blog",
          JSON.stringify({
            title,
            content,
            min_qualification: minQualificaton,
            tags: selectedTags,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        // console.log("Response Data:  ", response?.data);

        toast.success("Success! New Post Redirected.", {
          duration: 2500,
          icon: "🎉",
        });

        navigate("/blogs");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div>
        <Toaster toastOptions={{ position: "top-center" }} />
      </div>
      <div className="w-full">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginLeft: "20px" }}>
            <div>
              <h1
                style={{
                  color: "#3B5998",
                  fontFamily: "'Alkatra', cursive",
                  fontWeight: "bolder",
                  fontSize: "30px",
                }}
              >
                Blog Post
              </h1>
            </div>
            <div style={{ marginTop: "5px" }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  marginTop: "8px",
                  marginBottom: "6px",
                  fontWeight: "bolder",
                }}
              >
                Title{" "}
              </p>
              <TextField
                style={{ width: "300px" }}
                id="outline-basic"
                size="small"
                label="Enter the title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                inputProps={{
                  style: {
                    backgroundColor: "white",
                  },
                }}
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  marginTop: "16px",
                  marginBottom: "6px",
                  fontWeight: "bolder",
                }}
              >
                Content{" "}
              </p>

              <TextField
                style={{ width: "70%" }}
                id="outline-basic"
                size="small"
                multiline
                label="Enter the content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                inputProps={{
                  style: {
                    backgroundColor: "white",
                  },
                }}
                InputProps={{
                  rows: 5,
                  maxRows: 7,
                }}
              />
            </div>

            <div style={{ marginTop: "5px" }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  marginTop: "8px",
                  marginBottom: "6px",
                  fontWeight: "bolder",
                }}
              >
                Minimum Qualification{" "}
              </p>
              <select
                onChange={onChangeQualification}
                className="w-[350px] outline-none border-gray-300 border-2 py-2 bg-white"
              >
                <option defaultValue disabled>
                  Select Minimum Qualification for Blog
                </option>
                {Qualifications.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: "12px" }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  marginTop: "8px",
                  marginBottom: "10px",
                  fontWeight: "bolder",
                }}
              >
                Tags{" "}
                {numberTags === 5 && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    Added all tags
                  </span>
                )}
                {numberTags < 5 && (
                  <span style={{ color: "green", fontSize: "14px" }}>
                    Can add {5 - numberTags} tags
                  </span>
                )}
              </p>
              <TextField
                style={{ width: "300px" }}
                id="outline-basic"
                size="small"
                label="Tags"
                value={currentTag}
                onChange={(e) => {
                  setCurrentTag(e.target.value);
                }}
                inputProps={{
                  style: {
                    backgroundColor: "white",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (currentTag !== "") {
                      if (numberTags < 5) {
                        setTags([
                          ...tags,
                          { key: numberTags, label: currentTag },
                        ]);
                        const val = numberTags + 1;
                        setNumberTags(val);
                        setCurrentTag("");
                      }
                    }
                  }
                }}
              />
              <Paper
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                }}
                component="ul"
              >
                {tags.map((data) => {
                  return (
                    <ListItem key={data.key}>
                      <Chip label={data.label} onDelete={handleDelete(data)} />
                    </ListItem>
                  );
                })}
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <Button
            style={{
              marginLeft: "18px",
              marginTop: "10px",
              backgroundColor: "#3B5998",
              marginBottom: "25px",
            }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </div>
      </div>
    </>
  );
}
