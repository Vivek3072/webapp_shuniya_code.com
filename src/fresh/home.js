import React, { Component } from 'react'
import axios from 'axios';
import Helmet from 'react-helmet'




export default class home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          texteditor: '',
          showtext : ''
        };
      }


    submitHandler = () => {
        var getText = document.getElementById('texteditor').value;
        console.log(getText)
        
        var code_text_b64 = btoa(unescape(encodeURIComponent(getText)))
        const postBody = 
    {
        "code_file_name":"a.py",
        "code_input":"1",
        "code_text_b64":code_text_b64,
        "input_flag":"ABSENT"
        }
        var postContent = JSON.stringify(postBody)
        const headers = {
        'Content-Type': "application/json"
    }
        const res = axios.post("http://ec2-13-232-16-70.ap-south-1.compute.amazonaws.com:8000/api/v1/web_ide/", postContent, headers)
        .then( res => {
        // dispatch({
        //     type: CODE_SUBMIT_SUCCESS,
        //     payload: res.data,
            
        // })
        this.setState({
            showtext : res.data
        })
    })
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="menu-bar">
                            <button className="btn btn-sm btn-primary submit-btn" style={{ position: 'relative', top: '20%' }} onClick={this.submitHandler}>Submit</button>
                        </div>
                        <textarea id="texteditor" className="editor_area">पश्य("hello ,world")</textarea>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="menu-bar"></div>


                        {this.state.showtext}

                    </div>
                </div>
            </div>
        )
    }
}
