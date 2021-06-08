import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";

function PublicArticles() {
  const [generalArticles, setGeneralArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://कोड.com:8000/api/v1/get_articles_for_general_user/")
      .then((res) => {
        console.log(res.data);
        setGeneralArticles(res.data);
      });
  }, []);

  return (
    <Col>
      {generalArticles.map((article, idx) => (
        <Card key={`article-${idx}`} className="my-2">
          <Card.Link href={`/article/public/${idx}`}>
            <Card.Body className="article-title-card">
              <Card.Title className="lg-font">{article.title}</Card.Title>
              <Card.Subtitle className="text-muted my-3">
                {article.timestamp.slice(0, 10)}
              </Card.Subtitle>
              <Card.Subtitle className="text-muted">
                {article.user_id}
              </Card.Subtitle>
            </Card.Body>
          </Card.Link>
        </Card>
      ))}
    </Col>
  );
}

export default PublicArticles;
