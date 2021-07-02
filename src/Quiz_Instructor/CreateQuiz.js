import React, { useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { FaRegCircle } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import "./style.css";

function CreateQuiz() {
  const [questionList, setQuestionList] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [userID, setUserID] = useState(localStorage.getItem("user-id"));
  const [publishDate, setPublishDate] = useState("2021-01-01T00:00:00Z");
  const [selected, setSelected] = useState([]);
  const history = useHistory();

  const options = [
    { name: "Class 6", value: "class6" },
    { name: "Class 7", value: "class7" },
    { name: "Class 8", value: "class8" },
    { name: "Class 9", value: "class9" },
    { name: "Class 10", value: "class10" },
  ];

  const addOption = (q_idx) => {
    const newQuestionList = questionList.map((question) => {
      if (question.questionId === q_idx + 1) {
        let options = question.options;
        let len = options.length;
        const updatedQuestion = {
          ...question,
          options: [...options, { opt_id: len + 1, option_value: "" }],
        };
        return updatedQuestion;
      }
      return question;
    });
    setQuestionList(newQuestionList);
  };

  const submitHandler = async (state) => {
    const quizData = JSON.stringify({
      quiz_title: quizTitle,
      questions: questionList,
      apllicable_batches: selected,
    });

    let batches = selected.map((option) => option.value);
    const batchesStr = batches.join(",");

    var formData = new FormData();
    formData.append("creator_id", userID);
    formData.append("publish_time", publishDate);
    formData.append("applicable_batches", `{${batchesStr}}`);
    formData.append("state", state);
    formData.append("data", quizData);

    // for (var d in formData.entries()) {
    //   console.log(d);
    // }

    // console.log(Array.from(formData));

    const headers = { "Content-Type": "mutipart/form-data" };
    const response = await axios.post(
      "http://कोड.com:8000/api/v1/quiz_create/",
      formData,
      headers
    );
    if (response.status == 200) history.push("/manage-quiz");
  };

  const addMCQQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        questionId: questionList.length + 1,
        questionType: "Multiple Choice",
        questionText: "",
        options: [],
        answerKey: 0,
      },
    ]);
  };

  const addWriteUpQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        questionId: questionList.length + 1,
        questionType: "Write Up",
        questionText: "",
        answerText: "",
      },
    ]);
  };

  const questionTextChange = (id, text) => {
    const newQuestionList = questionList.map((question) => {
      if (question.questionId === id) {
        const updatedQuestion = {
          ...question,
          questionText: text,
        };
        return updatedQuestion;
      }
      return question;
    });
    setQuestionList(newQuestionList);
  };

  const answerTextChange = (id, text) => {
    const newQuestionList = questionList.map((question) => {
      if (question.questionId === id) {
        const updatedQuestion = {
          ...question,
          answerText: text,
        };
        return updatedQuestion;
      }
      return question;
    });
    setQuestionList(newQuestionList);
  };

  const radioTextChange = (id, text, opt_id) => {
    const newQuestionList = questionList.map((question) => {
      if (question.questionId === id) {
        let newOptions = question.options;
        const updatedQuestion = {
          ...question,
          options: [
            ...newOptions.map((option) => {
              if (option.opt_id === opt_id) {
                return { opt_id: opt_id, option_value: text };
              }
              return option;
            }),
          ],
        };
        return updatedQuestion;
      }
      return question;
    });
    setQuestionList(newQuestionList);
    // console.log(questionList);
  };

  const deleteOption = (id, opt_id) => {
    const newQuestionList = questionList.map((question) => {
      if (question.questionId === id) {
        let newOptions = question.options.filter(
          (option) => option.opt_id !== opt_id + 1
        );

        const updatedQuestion = {
          ...question,
          options: [
            ...newOptions.map((option, idx) => {
              return { opt_id: idx + 1, option_value: option.option_value };
            }),
          ],
        };
        return updatedQuestion;
      }
      return question;
    });
    setQuestionList(newQuestionList);
    // console.log(questionList);
  };

  const answerKeyChange = (id, answer_key) => {
    const newQuestionList = questionList.map((ques) => {
      if (ques.questionId === id) {
        const updatedQuestion = {
          ...ques,
          answerKey: answer_key,
        };
        return updatedQuestion;
      }
      return ques;
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const deleteQuestion = (id) => {
    const newQuestionList = questionList.filter(
      (question) => question.questionId !== id
    );
    setQuestionList([
      ...newQuestionList.map((question, idx) => {
        return { ...question, questionId: idx + 1 };
      }),
    ]);
  };

  const handleSelect = (selectedList, selectItem) => {
    setSelected([...selectedList]);
  };

  const handleRemove = (selectedList, removeItem) => {
    const newList = selectedList.filter(
      (item) => item.name !== removeItem.name
    );
    setSelected(newList);
  };

  return (
    <Col lg={8} className="py-3 mx-auto">
      <Form>
        <Form.Group>
          <Form.Label>Publish Date</Form.Label>
          <Form.Control
            type="date"
            value={publishDate.slice(0, 10)}
            onChange={(e) => {
              const date = e.target.value;
              setPublishDate(date + "T" + publishDate.slice(11, -1) + "Z");
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Publish Time</Form.Label>
          <Form.Control
            type="time"
            value={publishDate.slice(11, -1)}
            onChange={(e) => {
              const time = e.target.value;
              setPublishDate(publishDate.slice(0, 11) + time + "Z");
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Applicable Batches</Form.Label>
          <Multiselect
            options={options}
            displayValue="name"
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Untitled"
            size="lg"
            value={quizTitle}
            onChange={(e) => {
              setQuizTitle(e.target.value);
            }}
          />
        </Form.Group>

        {questionList.map((q, idx) => {
          return (
            <Card className="px-4 py-4 question-card" key={idx}>
              <Row>
                <Col lg={8}>
                  <Card.Title>
                    <Form.Control
                      as="textarea"
                      value={q.questionText}
                      placeholder="Question Text"
                      size="md"
                      style={{ overflow: "visible", wordWrap: "break-word" }}
                      onChange={(e) => {
                        questionTextChange(q.questionId, e.target.value);
                      }}
                    />
                  </Card.Title>
                </Col>
                <Col lg={3}>
                  {q.questionType}
                  {/* {q.questionId} */}
                </Col>
              </Row>
              <Form.Group>
                {q.questionType == "Multiple Choice" && (
                  <>
                    {/* {q.options.length} */}
                    {q.options.map((option, opt_idx) => {
                      return (
                        <Row key={"opt_" + opt_idx}>
                          <Col
                            lg={1}
                            md={1}
                            sm={1}
                            xs={1}
                            xl={1}
                            className="pl-2 pr-0"
                          >
                            <FaRegCircle />
                          </Col>
                          <Col className="px-2" lg={4} md={5} sm={7} xs={10}>
                            <Form.Control
                              type="text"
                              value={option.option_value}
                              placeholder="Untitled"
                              size="md"
                              onChange={(e) => {
                                radioTextChange(
                                  q.questionId,
                                  e.target.value,
                                  opt_idx + 1
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <BsX
                              onClick={() => {
                                deleteOption(q.questionId, opt_idx);
                              }}
                            />
                          </Col>
                        </Row>
                      );
                    })}

                    <Button
                      onClick={() => {
                        addOption(idx);
                      }}
                    >
                      Add option
                    </Button>
                    <Form.Control
                      as="select"
                      value={q.answerKey}
                      onChange={(e) => {
                        answerKeyChange(q.questionId, e.target.value);
                      }}
                    >
                      {q.options.map((option) => (
                        <option>{option.opt_id}</option>
                      ))}
                    </Form.Control>
                  </>
                )}

                {q.questionType === "Write Up" && (
                  <Row>
                    <Form.Control
                      as="textarea"
                      value={q.answerText}
                      placeholder="Type the correct answer"
                      size="md"
                      onChange={(e) => {
                        answerTextChange(q.questionId, e.target.value);
                      }}
                    />
                  </Row>
                )}
              </Form.Group>
              <RiDeleteBin6Line
                onClick={() => {
                  deleteQuestion(q.questionId);
                }}
              />
            </Card>
          );
        })}
        <Button onClick={addMCQQuestion}>Add MCQ Question</Button>
        <Button onClick={addWriteUpQuestion}>Add Write Up Question</Button>
      </Form>
      <Button
        onClick={() => {
          submitHandler("save");
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          submitHandler("publish");
        }}
      >
        Publish
      </Button>
    </Col>
  );
}

export default CreateQuiz;
