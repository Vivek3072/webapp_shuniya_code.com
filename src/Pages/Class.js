import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import SecondLayout from './../Layout/SecondLayout';
const Class = (props) => {
    const [data, setData] = useState([]);
    let {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const sectionList = ['class 9', 'class 8', 'class 7', 'class 6']
    const [query, setQuery] = useState(id);
    const [chapter, setChapter] = useState("");
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const result = await axios('http://xn--11by0j.com:8000/api/v1/get_class_data/' + query)
            setData(result.data.question_code_data)
            setIsLoading(false);
        }
        fetchData()
    }, [query])

    return (
        <Container size className="SideContainer" >
            {data.map((chapter, index) => {
                console.log(chapter)
                return (
                    <div key={index} >
                        <h4 className="mt-2">#Chapter: {chapter.chapter_name}</h4>
                        <p className="text-muted">{chapter.chapter_description}</p>
                        <div className="border-top rounded ">
                            {chapter.chapter_data.map((section, index) => {
                                return (
                                    <div key={index}className="border mb-2 p-2 rounded overflow-hidden" >
                                        <h5 className="mt-2 mb-3 text-center align-center border-bottom">
                                        {section.section_name}
                                        </h5>
                                        {/* <img src={section.section_image_url} alt={section.section_name}/> */}
                                        <div className=" scrolling-wrapper row flex-row flex-nowrap mt-2  p-2" style={{ overflowX: 'scroll'  }}>
                                            {section.section_data.map((questions, index) => {
                                                const decodedCode = decodeURIComponent(escape(window.atob(questions.bhav_file)))
                                                return (
                                                    <div className="p-1">
                                                        <Card key={index}  style={{width: '16rem'}} >
                                                        <Card.Body>
                                                            <Card.Text>{questions.question_statement} </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" rounded">
                                                            <Button size='sm' variant="dark" value={decodedCode} onClick={props.handleCopy}>
                                                                code </Button>
                                                        </Card.Footer>
                                                    </Card>

                                                    </div>
                                                    
                                                )
                                            })}


                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                )
            })}
        </Container>
    )
}

export default Class;