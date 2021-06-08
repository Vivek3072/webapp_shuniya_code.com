import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Col, Card } from "react-bootstrap";

function ArticleView(props) {
  const article_no = props.match.params.article_no;
  const [filePath, setFilePath] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [markdown, setMarkdown] = useState("");

  const file_fetch = { file_path: "" };

  async function filePathHandle() {
    const response = await axios.get(
      `http://कोड.com:8000/api/v1/get_articles_for_general_user/`
    );
    try {
      if (response.status == 200) {
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

  return (
    <Col className="text-center py-2">
      <Card>
        <Card.Body>
          <ReactMarkdown children={markdown} className="py-3" />
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ArticleView;
