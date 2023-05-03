import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import SecondLayout from './../Layout/SecondLayout';
const Class = (props) => {
    const [data, setData] = useState([]);
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
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
        <Container fluid={true} className="SideContainer" >
            {isLoading ? <p>Loading...</p> : (
                <div>
                    {data.map((chapter, index) => {
                        return (
                            <div key={index}  className="page">
                                <h4 className="mt-2">Chapter: {chapter.chapter_name}</h4>
                                <p className="text-muted">{chapter.chapter_description}</p>
                                <div className="border-top rounded ">
                                    {chapter.chapter_data.map((section, index) => {
                                        return (
                                            <div key={index} className="border mb-2 p-2 rounded overflow-hidden" >
                                                <p className="mt-2 mb-3 text-center align-center border-bottom">
                                                    {section.section_name}
                                                </p>
                                                {/* <img src={section.section_image_url} alt={section.section_name}/> */}
                                                <ListGroup  >
                                                    {section.section_data.map((questions, index) => {
                                                        const decodedCode = decodeURIComponent(escape(window.atob(questions.bhav_file)))
                                                        return (
                                                            <button key={index} className="buttonStyle" value={decodedCode} onClick={props.handleCopy}>
                                                                {index + 1 + ". " + questions.question_statement}
                                                            </button>
                                                        )
                                                    })}
                                                </ListGroup>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    })}

                </div>
            )}

        </Container>
    )
}

export default Class;