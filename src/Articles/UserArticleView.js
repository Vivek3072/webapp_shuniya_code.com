import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Col, Card, Button, Row, Image, Spinner } from "react-bootstrap";
import gfm from "remark-gfm";
import "./markdown.css";

function ArticleView(props) {
  const user_id = props.match.params.user_id;
  const article_no = props.match.params.article_no;
  const [filePath, setFilePath] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [date, setDate] = useState("");
  console.log(user_id);

  const file_fetch = { file_path: "" };

  async function filePathHandle() {
    const response = await axios.get(
      `http://कोड.com:8000/api/v1/get_article_for_user/${user_id}`
    );
    try {
      if (response.status == 200) {
        setFilePath(response.data[article_no].file_path);
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
    <Col className="text-center py-2">
      {isLoaded ? (
        <Card className="align-center">
          {/* <Button variant="primary" href={`/edit/${user_id}/${article_no}`}>
          Edit
        </Button> */}
          <Card.Body>
            <ReactMarkdown remarkPlugins={[gfm]} className="py-3">
              {markdown}
            </ReactMarkdown>
          </Card.Body>
          <Card.Footer className="bg-white">
            <Card className="footer my-3 py-2 text-start">
              <Row>
                <Col xs={4} md={1} className="mx-0 my-0 py-1 px-3">
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
                  <Card.Title className="article-writer">{user_id}</Card.Title>
                  <Card.Subtitle className="writtenby">{date}</Card.Subtitle>
                </Col>
              </Row>
            </Card>
          </Card.Footer>
        </Card>
      ) : (
        <Spinner animation="border" size="xl" className="mt-5" />
      )}
    </Col>
  );
}

export default ArticleView;
