import React, { useEffect, useState } from "react";
import { Button, CardDeck, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ManageQuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const history = useHistory();

  const createQuizHandler = () => {
    history.push("/create-quiz");
  };

  useEffect(async () => {
    const res = await axios.get(
      `http://कोड.com:8000/api/v1/get_quiz_for_creator/${localStorage.getItem(
        "user-id"
      )}/`
    );
    console.log(res);
    setQuizzes(res.data);
  }, []);

  return (
    <div>
      <Button onClick={createQuizHandler}>Create Quiz</Button>
      <CardDeck>
        {quizzes.map((quiz) => {
          <Card></Card>;
        })}
      </CardDeck>
    </div>
  );
}

export default ManageQuizPage;
