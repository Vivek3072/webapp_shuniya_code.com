import React from "react";
import { Row, Col } from "react-bootstrap";
import './Footer.css';
import { Code } from "react-bootstrap-icons";

function HindiFooter(){
  return(
    <div className='main-footer'>
        <div className='footer-middle'>
        <div className='container'>
            <Row>
                <Col>
                <Row>
                {/*column 1*/}
                <Col className="col-md-2 padding-0 fw-bold">
                    <h7 style={{color:'white'}}><a href="/homepage">Home</a></h7>
                </Col>
                {/*column 2*/}
                <Col className="col-md-2 padding-0" style={{textAlign:"center"}}>
                    <h7 style={{color:'white'}}><b>Tutorials</b></h7>
                    <ul className='list-unstyled'>
                        <li><a href="/bhav-tutorials">भव</a></li>
                        <li>डाटाकार</li>
                        <li>अल्गोरिथम</li>
                    </ul>
                </Col>
                {/*column 3*/}
                <Col className="col-md-2 padding-0" style={{textAlign:"center"}}>
                    <h7 style={{color:'white'}}><b>Class</b></h7>
                    <ul className='list-unstyled'>
                        <li><a href="/class/class_6">6</a></li>
                        <li><a href="/class/class_7">7</a></li>
                        <li><a href="/class/class_8">8</a></li>
                        <li><a href="/class/class_9">9</a></li>
                        <li><a href="/class/class_10">10</a></li>
                    </ul>
                </Col>
                {/*column 4*/}
                <Col className="col-md-2 padding-0" style={{textAlign:"center"}}>
                    <h7 style={{color:'white'}}><b>Write</b></h7>
                    <ul className='list-unstyled'>
                        <li><a href="/write">आर्टिकल लिखे</a></li>
                    </ul>
                </Col>
                <Col className="col-md-2 padding-0 fw-bold" style={{textAlign:"center"}}>
                    <h7 style={{color:'white'}}>Language</h7>
                </Col>
                </Row>
                </Col>
                <Col md={2}></Col>
                <Col className="col-md-2 padding-0 fw-bold">
                    <h1 className="fw-bold" 
                        style={{color:'white'}}>
                            <a href="/"><Code size={50} className="mr-1" />कोड</a>
                    </h1>
                </Col>
            </Row>
        </div>
        </div>
    </div>
        
  );
};

export default HindiFooter;