import React, { Component } from 'react'
import axios from 'axios';




export default class home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          texteditor: '',
          showtext : '',
          isSubmited : false,
          isloaded : false
        };
      }


    submitHandler = () => {
        this.setState({
            isloaded : false,
            isSubmited : true
        })
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
        this.setState({
            showtext : res.data,
            isloaded : true
        })
    })
    }
    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <h1>कोड</h1>
                        <textarea id="texteditor" className="editor_area">पश्य("hello ,world")</textarea>
                        <div className="menu-bar" style={{ position: 'relative', textAlign: 'end'}}>
                            <button className="btn btn-sm btn-primary submit-btn" onClick={this.submitHandler}>Submit</button>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="menu-bar"></div>
                        <br></br>
                        <br></br>
                        <br></br>
                        
                        {this.state.isSubmited ? <h1>परिणाम</h1> : <h3>Submit to see result</h3>}
                        {this.state.isloaded ? <textarea className="sub" value={this.state.showtext}>  </textarea> : <h6>Please wait ....................</h6>}

                        

                    </div>
                </div>
            </div>
        )
    }
}
