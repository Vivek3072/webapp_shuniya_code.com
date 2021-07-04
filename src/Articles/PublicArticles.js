import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Button,
  Row,
  Container,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  InputGroup,
  FormControl,
  Form,
  ListGroupItem,
} from "react-bootstrap";

import "./articlelist.css";

function PublicArticles() {
  const [generalArticles, setGeneralArticles] = useState([]);
  const [filterList, setFilterList] = useState([
    "Function",
    "List",
    "String",
    "Class",
    "Variable",
  ]);

  const filterFunction = (item, checked) => {
    if (checked) {
      setFilterList([...filterList, item]);
    } else {
      let idx = filterList.indexOf(item);
      const newList = filterList
        .slice(0, idx)
        .concat(filterList.slice(idx + 1));
      setFilterList(newList);
      console.log(newList);
    }
  };

  useEffect(() => {
    axios
      .get("http://कोड.com:8000/api/v1/get_articles_for_general_user/")
      .then((res) => {
        console.log(res.data);
        setGeneralArticles(res.data);
      });
  }, []);

  return (
    <Container className="py-5">
      <Row xs={9} md={1} lg={1} className="text-right pr-3 pb-3">
        <div className="text-right">
          <DropdownButton
            as={ButtonGroup}
            title="Filter"
            variant="secondary"
            className="mx-4 px-0 py-0 ml-auto filter-btn"
            id="filter"
          >
            {["Function", "List", "String", "Class", "Variable"].map((item) => (
              <Dropdown.ItemText className="filter-item-box">
                <Form.Check
                  type="checkbox"
                  id={item}
                  label={item}
                  value={item}
                  defaultChecked
                  onChange={(e) => {
                    filterFunction(e.target.value, e.target.checked);
                  }}
                />
              </Dropdown.ItemText>
            ))}
            {/* <Dropdown.ItemText className="filter-item-box">
              <Form.Check
                type="checkbox"
                id="Function"
                label="Function"
                value="Function"
                defaultChecked
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Dropdown.ItemText>
            <Dropdown.ItemText className="filter-item-box">
              <Form.Check type="checkbox" id="Something" label="Something" />
            </Dropdown.ItemText> */}
          </DropdownButton>

          <Button
            className="mx-4 ml-auto filter-btn btn-secondary"
            variant="link"
            href="/write"
          >
            Write new
          </Button>
        </div>
      </Row>
      <Col>
        {generalArticles
          .filter((article) => filterList.includes(article.category))
          .map((article, idx) => (
            <Card key={`article-${idx}`} className="my-4 article-card">
              <Card.Body className="article-title-card">
                <Card.Title className="lg-font">{article.title}</Card.Title>
                <Card.Subtitle className="date-modified my-3">
                  {article.user_id} | {article.timestamp.slice(0, 10)}
                </Card.Subtitle>

                <div className="text-right">
                  <Card.Link href={`/article/public/${idx}`}>
                    <Button className="mx-auto viewbtn btn-dark">View</Button>
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
    </Container>
  );
}

export default PublicArticles;
