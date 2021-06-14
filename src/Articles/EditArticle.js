import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import CodeEditor from "../CodeEditor/CodeEditor";
import { languages } from "../CodeEditor/languages";

import { CaretRightSquareFill } from "react-bootstrap-icons";

import { ReactTransliterate } from "../TextEditor/Translator/index";
import axios from "axios";
import ControlledEditor from "../TextEditor/MainEditor";
// import MyEditor from "./Editor";
import { mdToDraftjs, draftjsToMd } from "draftjs-md-converter";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { useHistory } from "react-router";
import "../TextEditor";

const Classes = [
  { label: "Class 6", value: "class_6" },
  { label: "Class 7", value: "class_7" },
  { label: "Class 8", value: "class_8" },
  { label: "Class 9", value: "class_9" },
  { label: "Class 10", value: "class_10" },
];

const Book = [{ label: "Class 7", value: "class_7" }];

const Topic = [
  { label: "function", value: "Function" },
  { label: "list", value: "List" },
  { label: "string", value: "String" },
  { label: "class", value: "Class" },
  { label: "variable", value: "Variable" },
];

const Difficulty = [
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Hard", value: "Hard" },
  { label: "Extreme", value: "Extreme" },
];

const FormContainer = (props) => {
  const history = useHistory();
  const [lang, setLang] = useState("hi");
  const [header, setHeader] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [explanation, setExplanation] = useState("");
  const [code, setCode] = useState("");
  const [book, setBook] = useState("");

  const [classes, setClasses] = useState("class_6");

  const [topic, setTopic] = useState("Function");

  const [difficulty, setDifficulty] = useState("Easy");

  const [loading, setLoading] = useState(false);
  const [markdownLoaded, setMarkdownLoaded] = useState(false);

  const [runcode, setRunCode] = useState("");

  const textEditorRef = useRef(null);

  const article_no = props.match.params.article_no;
  const user_id = props.match.params.user_id;
  const [filePath, setFilePath] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [articleID, setArticleID] = useState("");

  const file_fetch = { file_path: "" };

  async function filePathHandle() {
    const response = await axios.get(
      `http://कोड.com:8000/api/v1/get_article_for_user/${user_id}`
    );
    try {
      if (response.status == 200) {
        console.log(response.data);
        setHeader(response.data[article_no].title);
        setTopic(response.data[article_no].category);
        setDifficulty(response.data[article_no].tags.split(",")[0]);
        setClasses(response.data[article_no].tags.split(",")[1]);
        setArticleID(response.data[article_no].article_id);
        setFilePath(response.data[article_no].file_path);
        file_fetch.file_path = filePath;
        fileFetchHandle();
      }
    } catch {
      console.error("Error");
    }
  }

  async function fileFetchHandle() {
    var file_path_json = JSON.stringify(file_fetch);
    // console.log(file_fetch);
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "http://कोड.com:8000/api/v1/retrieve_articles/",
      file_path_json,
      headers
    );
    try {
      setFileURL(response.data.url);
    } catch {
      console.error("Error");
    }
  }

  useEffect(() => {
    filePathHandle();
    console.log(fileURL);
    axios.get(fileURL).then((res) => {
      console.log(res.data);
      setMarkdown(res.data);
    });
  });

  const handlePublish = () => {
    if (header === "") {
      alert("Please enter a valid Header");
    } else {
      const content =
        textEditorRef.current.state.editorState.getCurrentContent();
      const mdText = draftjsToMd(convertToRaw(content));
      let blob = new Blob([mdText], { type: "text/markdown" });

      var formData = new FormData();
      formData.append("file", blob, "ts.md");
      formData.append("article_id", articleID);
      formData.append("user_id", localStorage.getItem("user-id"));
      formData.append("feedback", "");
      formData.append("remarks", "");
      formData.append("title", header);
      formData.append("published_status", "YES");
      formData.append("category", topic);
      formData.append("tags", [difficulty, classes]);
      formData.append("reviewer_id", "temporary_testing");
      formData.append("status", "reviewed");
      formData.append("reviewer_reference_id", "None");

      const headers = { "Content-Type": "multipart/form-data" };

      // console.log(formData);
      const response = axios
        .post(
          "http://कोड.com:8000/api/v1/article_review_demo/",
          formData,
          headers
        )
        .then((res) => {
          console.log(res);
          alert("Article published successfully");
          history.push("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSave = () => {
    if (header === "") {
      alert("Please enter a valid Header");
    } else {
      const content =
        textEditorRef.current.state.editorState.getCurrentContent();
      const mdText = draftjsToMd(convertToRaw(content));
      let blob = new Blob([mdText], { type: "text/markdown" });

      var formData = new FormData();
      formData.append("file", blob, "ts.md");
      formData.append("article_id", articleID);
      formData.append("user_id", localStorage.getItem("user-id"));
      formData.append("feedback", "");
      formData.append("remarks", "");
      formData.append("title", header);
      formData.append("published_status", "NO");
      formData.append("category", topic);
      formData.append("tags", [difficulty, classes]);
      formData.append("reviewer_id", "None");
      formData.append("status", "saved");
      formData.append("reviewer_reference_id", "None");

      const headers = { "Content-Type": "multipart/form-data" };

      // console.log(formData);
      const response = axios
        .post(
          "http://कोड.com:8000/api/v1/article_review_demo/",
          formData,
          headers
        )
        .then((res) => {
          console.log(res);
          alert("Article saved successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSubmit = () => {
    if (header === "") {
      alert("Please enter a valid Header");
    } else {
      const content =
        textEditorRef.current.state.editorState.getCurrentContent();
      const mdText = draftjsToMd(convertToRaw(content));
      let blob = new Blob([mdText], { type: "text/markdown" });

      var formData = new FormData();
      formData.append("file", blob, "ts.md");
      formData.append("article_id", articleID);
      formData.append("user_id", localStorage.getItem("user-id"));
      formData.append("feedback", "");
      formData.append("remarks", "");
      formData.append("title", header);
      formData.append("published_status", "NO");
      formData.append("category", topic);
      formData.append("tags", [difficulty, classes]);
      formData.append("reviewer_id", "None");
      formData.append("status", "submitted_for_review");
      formData.append("reviewer_reference_id", "None");

      const headers = { "Content-Type": "multipart/form-data" };

      // console.log(formData);
      const response = axios
        .post(
          "http://कोड.com:8000/api/v1/article_review_demo/",
          formData,
          headers
        )
        .then((res) => {
          console.log(res);
          alert("Article submitted for review successfully");
          history.push("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleCodeRun = () => {
    setLoading(true);
    const getTest = code;
    const code_text_b64 = btoa(unescape(encodeURIComponent(getTest)));
    const postBody = {
      code_file_name: "a.py",
      code_input: "1",
      code_text_b64: code_text_b64,
      input_flag: "ABSENT",
    };
    var postContent = JSON.stringify(postBody);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = axios
      .post("http://कोड.com:8000/api/v1/web_ide/", postContent, headers)
      .then((res) => {
        setRunCode(res.data);
        setLoading(false);
        console.log(res.data);
      });
  };

  return (
    <Container fluid>
      <Form>
        <Row>
          <Col xs={12} md={9} className="mt-2">
            <Container className="border rounded">
              <h2 className="text-bold mt-2">Post </h2>
              <Form.Group controlId="" size="lg">
                <Form.Label>Header</Form.Label>
                <ReactTransliterate
                  size="lg"
                  type="input"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  lang={lang}
                  className="rounded mb-3"
                />
              </Form.Group>
              <Form.Label htmlFor="Header">Editor</Form.Label>
              {/* This is the Text Editors */}
              <ControlledEditor ref={textEditorRef} />
              <Form.Group>
                <Form.Label htmlFor="TransliterationBox" className="mt-4">
                  Transliteration Box: (Copy paste below content to editor to
                  add to the article)
                </Form.Label>
                <ReactTransliterate
                  size="md"
                  type="textarea"
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  lang={lang}
                  className="rounded mb-3 transliterate-box"
                  placeholder="Enter text here to transliterate and paste in the editor above"
                />
              </Form.Group>
              <br />

              <CodeEditor
                texteditor={code}
                handleChange={(e) => setCode(e.target.value)}
              />
              <Button variant="white" className="p-0" onClick={handleCodeRun}>
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  <CaretRightSquareFill color="dark" size={25} />
                )}
              </Button>
              <Form.Control
                type="text"
                value={runcode}
                placeholder="Readonly input here..."
                readOnly
              />
            </Container>
          </Col>
          <Col xs={6} md={3} className="mt-2">
            <Container fluid={true} className="border rounded pt-2">
              <Row>
                <Col>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    type="text"
                    size="sm"
                  >
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      as="select"
                      value={lang}
                      size="sm"
                      onChange={(e) => setLang(e.target.value)}
                      className="w-25 mt-3"
                    >
                      {languages.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={classes}
                      size="sm"
                      onChange={(e) => setClasses(e.target.value)}
                    >
                      {Classes.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control
                      as="select"
                      value={topic}
                      size="sm"
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      {Topic.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control
                      as="select"
                      value={difficulty}
                      size="sm"
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      {Difficulty.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Button
                  variant="dark"
                  type="button"
                  className="my-1"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Row>
              <Row className="mb-3">
                <Button
                  variant="dark"
                  type="button"
                  className="my-1"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Row>
              <Row>
                {"This will only be available for reviewer:"}
                <Button
                  variant="dark"
                  type="button"
                  className="my-1"
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FormContainer;
