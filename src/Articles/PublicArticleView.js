import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Col, Card, Image, Row, Spinner } from "react-bootstrap";
import "./markdown.css";

function ArticleView(props) {
  const article_no = props.match.params.article_no;
  const [filePath, setFilePath] = useState("");
  const [userID, setUserID] = useState("");
  const [date, setDate] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

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
      setIsLoaded(true);
    });
  });

  return (
    <Col className="py-2">
      {isLoaded ? (
        <Card className="align-center">
          <Col lg={9} md={12} className="mx-auto">
            <Card.Body>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={markdown}
                className="py-3"
              />
              <Card.Footer className="bg-white">
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
              </Card.Footer>
            </Card.Body>
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
