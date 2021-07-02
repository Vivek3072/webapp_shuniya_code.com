import React, { useEffect, useState } from "react";
import { Button, CardColumns, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./style.css";

function ManageQuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("user-id"));
  const history = useHistory();

  const createQuizHandler = () => {
    history.push("/create-quiz");
  };

  const deleteQuiz = async (quiz_id) => {
    const res = await axios.get(
      `http://कोड.com:8000/api/v1/delete_quiz/${quiz_id}`
    );
    history.push("/manage-quiz");

    console.log(res);
  };

  useEffect(async () => {
    const res = await axios.get(
      `http://कोड.com:8000/api/v1/get_quiz_for_creator/${userID}`
    );
    console.log(res.data);
    setQuizzes(res.data);
  }, []);

  return (
    <div>
      <Button onClick={createQuizHandler}>Create Quiz</Button>

      <CardColumns>
        {quizzes.map((quiz, idx) => {
          return (
            <Card key={"q" + idx}>
              <Card.Header>
                {quiz.state === "save" ? "Saved" : "Published"}
              </Card.Header>
              <Card.Body>
                <Card.Title>{quiz.data.quiz_title}</Card.Title>
                <Card.Text>
                  Applicable Batches:{" "}
                  <small>
                    {quiz.data.applicable_batches
                      ?.map((batch) => batch.name)
                      .join(", ") || ""}
                  </small>
                </Card.Text>
                <Card.Link
                  className="text-info hover-link"
                  href={`/update-quiz/${quiz.quiz_id}`}
                >
                  Update Quiz
                </Card.Link>
                <Card.Link
                  className="text-info hover-link"
                  onClick={() => {
                    deleteQuiz(quiz.quiz_id);
                  }}
                >
                  Delete Quiz
                </Card.Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Last updated: {quiz.last_edited}
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
}

export default ManageQuizPage;
