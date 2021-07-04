import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Col, Card, Image, Row, Spinner, Button } from "react-bootstrap";
import "./markdown.css";
import CodeEditor from "../CodeEditor/CodeEditor";

function ArticleView(props) {
  const article_no = props.match.params.article_no;
  const [filePath, setFilePath] = useState("");
  const [userID, setUserID] = useState("");
  const [date, setDate] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isArticleLoaded, setIsArticleLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [customInput, setCustomInput] = useState(false);
  const [code, setCode] = useState("");
  const [texteditor, setTexteditor] = useState("");
  const [generalArticles, setGeneralArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [articleRender, setArticleRender] = useState(false);
  const [testcaseInfo, setTestcaseInfo] = useState(1);

  const file_fetch = { file_path: "" };

  async function filePathHandle() {
    // setIsLoaded(false);
    const response = await axios.get(
      `http://कोड.com:8000/api/v1/get_articles_for_general_user/`
    );
    try {
      if (response.status == 200) {
        setFilePath(response.data[article_no].file_path);
        setUserID(response.data[article_no].user_id);
        setDate(response.data[article_no].timestamp.slice(0, 10));
        setGeneralArticles(response.data);
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
      axios.get(response.data.url).then((res) => {
        console.log(res.data);
        setMarkdown(res.data);
        setIsArticleLoaded(true);
      });
    } catch {
      console.error("Error");
    }
  }

  async function articleData() {
    filePathHandle();
    // console.log(fileURL);
  }

  const runCodeHandler = () => {
    setIsLoaded(false);
    setIsSubmited(true);
    var getText = texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));

    const code_input_b64 = btoa(unescape(encodeURIComponent(input)));

    const input_flag = customInput ? "PRESENT" : "ABSENT";
    const postBody = {
      code_file_name: "a.py",
      code_input_b64: customInput ? code_input_b64 : null,
      code_text_b64: code_text_b64,
      input_flag: input_flag,
    };
    console.log(postBody);
    var postContent = JSON.stringify(postBody);
    const headers = {
      "Content-Type": "application/json",
    };
    const res = axios
      .post("http://कोड.com:8000/api/v1/web_ide/", postContent, headers)
      .then((res) => {
        setShowText(res.data);
        setIsLoaded(true);
      });
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const setcustomInput = (e) => {
    setCustomInput(!customInput);
  };

  const handleCode = () => {
    setTexteditor(code);
  };

  const handleChange = (e) => {
    setTexteditor(e.target.value);
  };

  const handleKeyDown = (evt) => {
    let value = texteditor,
      selStartPos = evt.currentTarget.selectionStart;
    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setTexteditor(value);
    }
  };

  useEffect(() => {
    articleData();
  }, [articleRender]);

  setInterval(() => {
    setArticleRender(true);
  }, 1000);

  return (
    <Col lg={9} className="mx-auto">
      <Row>
        <Col align="right">
          <Button className="mx-2 my-4 write-btn btn-secondary">
            Write New
          </Button>
        </Col>
      </Row>
      {isArticleLoaded ? (
        <Card className="py-4 align-center article-card">
          <Col lg={9} md={12} className="mx-auto">
            <Card.Body>
              <Card.Subtitle className="text-right writtenby">
                Written by: {userID} | {date}
              </Card.Subtitle>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={markdown}
                className="py-3"
              />

              <CodeEditor
                handleCode={handleCode}
                texteditor={texteditor}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                input={input}
                customInput={customInput}
                handleInput={handleInput}
                setcustomInput={setcustomInput}
              />
              <div className="text-right">
                <button
                  className="btn btn-secondary my-2 mx-1 submit-btn"
                  style={{ zIndex: 100 }}
                  onClick={runCodeHandler}
                >
                  Submit Code
                </button>
              </div>
              {isSubmited ? (
                <div>
                  <h3 className="pb-3">परिणाम</h3>
                  {isLoaded ? (
                    <textarea
                      className="code-output textarea"
                      readOnly={true}
                      value={showText}
                    >
                      {" "}
                    </textarea>
                  ) : (
                    <div>
                      <h6>प्रोसेसिंग....................</h6>
                      <div className="loader"></div>
                    </div>
                  )}
                </div>
              ) : (
                <h5></h5>
              )}
              {/* <Card.Footer className="bg-white">
                <Card className="footer my-3 py-2 text-start">
                  <Row>
                    <Col xs={4} md={1} className="mx-0 my-0 py-0 px-0">
                      <Image
                        src="https://www.hhcenter.org/wp-content/uploads/2017/02/person-placeholder.jpg"
                        className="profile"
                        roundedCircle
                      />
                    </Col>
                    <Col xs={8} md={11} className="mt-3">
                      <Card.Subtitle className="writtenby">
                        WRITTEN BY
                      </Card.Subtitle>
                      <Card.Title className="article-writer">
                        {userID}
                      </Card.Title>
                      <Card.Subtitle className="writtenby">
                        {date}
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Card>
              </Card.Footer> */}
              {/* <Button href={`/`}>Edit</Button> */}
            </Card.Body>
          </Col>
          <Col lg={6} align="center" className="mx-auto text-left">
            <h3 className="pb-3">Other Articles</h3>
            {/* {generalArticles[article_no].title}
            {generalArticles[0].title} */}
            {generalArticles
              .filter((article, idx) => {
                return article_no != idx;
              })
              .slice(0, 3)
              .map((article, idx) => (
                <Card key={`article-${idx}`} className="my-4 article-type-card">
                  <Card.Body className="article-title-card">
                    <Card.Title className="lg-font">{article.title}</Card.Title>
                    <Card.Subtitle className="date-modified my-3">
                      {article.user_id} | {article.timestamp.slice(0, 10)}
                    </Card.Subtitle>

                    <div className="text-right">
                      <Card.Link href={`/article/public/${idx}`}>
                        <Button className="mx-auto viewbtn btn-dark">
                          View
                        </Button>
                      </Card.Link>
                    </div>
                    <div>
                      {article.tags.split(",")[1]} | {article.category} |{" "}
                      {article.tags.split(",")[0]}
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Card>
      ) : (
        <Row>
          <Spinner animation="border" size="xl" className="mt-5 mx-auto" />
        </Row>
      )}
    </Col>
  );
}

export default ArticleView;
