import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Card } from "react-bootstrap";
import "./articlelist.css";

function UserArticleList() {
  const [userArticles, setUserArticles] = useState([]);
  async function userArticlesLoad() {
    const response = axios
      .get(
        `http://कोड.com:8000/api/v1/get_article_for_user/${localStorage.getItem(
          "user-id"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setUserArticles(res.data);
      });
  }
  useEffect(() => {
    userArticlesLoad();
  }, []);
  return (
    <Col>
      {userArticles.map((article, idx) => (
        <Card key={`article-${idx}`} className="my-2">
          <Card.Link
            href={`/article/user/${localStorage.getItem("user-id")}/${idx}`}
          >
            <Card.Body className="article-title-card">
              <Card.Title className="lg-font h2">{article.title}</Card.Title>
              <Card.Subtitle className="date-modified my-3">
                {article.timestamp.slice(0, 10)}
              </Card.Subtitle>
            </Card.Body>
          </Card.Link>
        </Card>
      ))}
    </Col>
  );
}

export default UserArticleList;
