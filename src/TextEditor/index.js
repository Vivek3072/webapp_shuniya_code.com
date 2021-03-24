import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import CodeEditor from '../CodeEditor/CodeEditor';
import { languages } from '../CodeEditor/languages'

import { CaretRightSquareFill, Textarea } from 'react-bootstrap-icons'

import { ReactTransliterate } from "./Translator/index";
import axios from 'axios';



const Classes = [
  { label: 'Class 6', value: 'class_6' },
  { label: 'Class 7', value: 'class_7' },
  { label: 'Class 8', value: 'class_8' },
  { label: 'Class 9', value: 'class_9' },
  { label: 'Class 10', value: 'class_10' },
]


const Book = [
  { label: 'Class 7', value: 'class_7' },
]

const Topic = [
  { label: "function", value: 'Function' },
  { label: "list", value: 'List' },
  { label: "string", value: 'String' },
  { label: "class", value: 'Class' },
  { label: "variable", value: 'Variable' },
]

const Difficulty = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
  { label: 'Extreme', value: 'Extreme' },
]

const FormContainer = () => {

  const [lang, setLang] = useState('hi')
  const [header, setHeader] = useState('')
  const [explanation, setExplanation] = useState('')
  const [code, setCode] = useState('')
  const [book, setBook] = useState('')

  const [classes, setClasses] = useState('class_6')

  const [topic, setTopic] = useState('Function')

  const [difficulty, setDifficulty] = useState('Easy')

  const [loading, setLoading] = useState(false)

  const [runcode, setRunCode] = useState('');

  const handleCodeRun = () => {
    setLoading(true)
    const getTest = code
    const code_text_b64 = btoa(unescape(encodeURIComponent(getTest)))
    const postBody = {
      code_file_name: "a.py",
      code_input: "1",
      code_text_b64: code_text_b64,
      input_flag: "ABSENT",
    };
    var postContent = JSON.stringify(postBody);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = axios
        .post(
          "http://कोड.com:8000/api/v1/web_ide/",
          postContent,
          headers
        )
        .then((res) => {
          setRunCode(res.data)
          setLoading(false)
          console.log(res.data)
        })


  }


  return (
    <Container>
      <Form >
        <Row >
          <Col xs={12} md={8} className="mt-2">

            <Container className="border rounded" >
              <h2 className="text-bold mt-2">Post </h2>
              <Form.Group controlId="" size="lg">
                <Form.Label>Header</Form.Label>
                <ReactTransliterate
                  size="lg"
                  type="input"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  lang={lang}
                  className="rounded mb-3"
                />
              </Form.Group>
              <Form.Label htmlFor="Header">
                Explanation
      </Form.Label>
              <ReactTransliterate
                type="textarea"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                lang={lang}
                className="rounded mb-3"
              />
              <CodeEditor
                texteditor={code}
                handleChange={(e) => setCode(e.target.value)}
              />
              <Button variant="white" className="p-0" onClick={handleCodeRun} >
               { loading ?
                  <Spinner animation="border" /> :
                  <CaretRightSquareFill color="dark" size={25}/>
               } 
              </Button>
              <Form.Control type="text" value={runcode} placeholder="Readonly input here..." readOnly />
            </Container>

          </Col>
          <Col xs={6} md={4} className="mt-2" >
            <Container fluid={true} className="border rounded pt-2">

              <Row >

                <Col >
                  <Form.Group controlId="exampleForm.ControlSelect1" type="text" size="sm">
                    <Form.Label>Language</Form.Label>
                    <Form.Control as="select" value={lang}
                      size="sm"
                      onChange={(e) => setLang(e.target.value)}
                      className="w-25 mt-3"
                    >
                      {
                        languages.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>

                </Col>

              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Class</Form.Label>
                    <Form.Control as="select" value={classes}
                      size="sm"
                      onChange={(e) => setClasses(e.target.value)}
                    >
                      {
                        Classes.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>

                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control as="select" value={topic}
                      size="sm"
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      {
                        Topic.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control as="select" value={difficulty}
                      size="sm"
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      {
                        Difficulty.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>

                </Col>
              </Row>
              <Row>
                <Button variant="dark" type="submit">
                  Submit
    </Button>
              </Row>
            </Container>

          </Col>
        </Row>
      </Form>

    </Container>



  )
}

export default FormContainer;