import React, { Fragment, Component } from "react";
import axios from "axios";
import './Index.css'
import FilterOptions from './filteroptions';
import FilterItems from './filteritems';


import CodeEditor from '../CodeEditor/CodeEditor';
import QuestionList from "../components/QuestionList";
import CodeSnippet from '../components/CodeSnippet';

import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';


var filterData = [
  { name: 'Aang', bender: 'yes', nation: 'Air', person: 'yes', show: 'ATLA' },
  { name: 'Appa', bender: 'yes', nation: 'Air', person: 'no', show: 'ATLA' },
  { name: 'Asami', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Azula', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Bolin', bender: 'yes', nation: 'Earth', person: 'yes', show: 'LOK' },
  { name: 'Katara', bender: 'yes', nation: 'Water', person: 'yes', show: 'ATLA' },
  { name: 'Korra', bender: 'yes', nation: 'Water', person: 'yes', show: 'LOK' },
  { name: 'Jinora', bender: 'yes', nation: 'Air', person: 'yes', show: 'LOK' },
  { name: 'Lin Beifong', bender: 'yes', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Pabu', bender: 'no', nation: 'Fire', person: 'no', show: 'LOK' },
  { name: 'Momo', bender: 'no', nation: 'Air', person: 'no', show: 'ATLA' },
  { name: 'Mai', bender: 'no', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Mako', bender: 'yes', nation: 'Fire', person: 'yes', show: 'LOK' },
  { name: 'Naga', bender: 'no', nation: 'Water', person: 'no', show: 'LOK' },
  { name: 'Sokka', bender: 'no', nation: 'Water', person: 'yes', show: 'ATLA' },
  { name: 'Suki', bender: 'no', nation: 'Earth', person: 'yes', show: 'ATLA' },
  { name: 'Tenzin', bender: 'yes', nation: 'Air', person: 'yes', show: 'LOK' },
  { name: 'Toph Beifong', bender: 'yes', nation: 'Earth', person: 'yes', show: 'ATLA' },
  { name: 'Ty Lee', bender: 'no', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Uncle Iroh', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Varrick', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Zhu Li', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Zuko', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' }
];

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      showtext: "",
      isSubmited: false,
      showSnippet: false,
      isloaded: false,
      data: filterData,
      bender: '',
      nation: '',
      person: '',
      show: '',
    };
    this.componentRef = React.createRef();
  }
  filterItems = (val, type) => {
    switch (type) {
      case 'bender':
        this.setState({ bender: val });
        break;
      case 'nation':
        this.setState({ nation: val });
        break;
      case 'person':
        this.setState({ person: val });
        break;
      case 'show':
        this.setState({ show: val });
        break;
      default:
        break;
    }
  };
  submitHandler = () => {
    this.setState({
      isloaded: false,
      isSubmited: true,
    });
    var getText = this.state.texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));
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
        this.setState({
          showtext: res.data,
          isloaded: true,
        });
      });
  };
  
  handleCopy = (e) => {
    this.setState({ texteditor: e.target.value })
  }
  handleCode = (code) => {
    this.setState({texteditor: code})
  }
  handleChange = (e) => {
    this.setState({ texteditor: e.target.value })
  }
  handleKeyDown = evt => {
    let value = this.state.texteditor,
      selStartPos = evt.currentTarget.selectionStart;

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      this.setState({texteditor:value});
    }
  };
  render() {
    const token = localStorage.getItem('access_token');
    var filteredItems = this.state.data;
    var state = this.state;
    ["bender", "nation", "person", "show"].forEach(function (filterBy) {
      var filterValue = state[filterBy];
      if (filterValue) {
        filteredItems = filteredItems.filter(function (item) {
          return item[filterBy] === filterValue;
        });
      }
    });
    var benderArray = this.state.data.map(function (item) { return item.bender });
    var nationArray = this.state.data.map(function (item) { return item.nation });
    var personArray = this.state.data.map(function (item) { return item.person });
    var showArray = this.state.data.map(function (item) { return item.show });
    benderArray.unshift("");
    nationArray.unshift("");
    personArray.unshift("");
    showArray.unshift("");
    return (  
      <>
        <div className="row page" >
          <div className="col-sm-6 col-md-4 col-lg-4">
       <button onClick={() => exportComponentAsJPEG(this.componentRef)}>
         Export As JPEG
       </button>
       <button onClick={() => exportComponentAsPDF(this.componentRef)}>
         Export As PDF
       </button>
       <button onClick={() => exportComponentAsPNG(this.componentRef)}>
         Export As PNG
       </button>
           
            <CodeSnippet syntaxedValue={this.state.texteditor}  ref={this.componentRef} />
            <QuestionList  handleCopy={this.handleCopy} code={this.state.texteditor}/>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div>कोड</div>
            <CodeEditor
            handleCode= {this.handleCode}
            texteditor ={this.state.texteditor}
            handleChange = {this.handleChange}
            handleKeyDown ={ this.handleKeyDown}
            />
            <div
              className="menu-bar"
              style={{ position: "relative", textAlign: "end" }}
            >
              <button
                className="btn btn-lg btn-primary submit-btn"
                onClick={this.submitHandler}
              >
                चल कोड
                </button>
            </div>
            {this.state.isSubmited ? (
              <div>
                <h1>परिणाम</h1>
                {this.state.isloaded ? (
                  <textarea className="sub" readOnly={true} value={this.state.showtext}>
                    {" "}
                  </textarea>
                ) : (
                  <div>
                    <h6>प्रोसेसिंग....................</h6>
                    <div className="loader"></div>
                  </div>
                )}
              </div>
            ) : (
              <h3>परिणाम देखने के लिए सबमिट करें</h3>
            )}
          </div>
        </div>
        <div className="row">
          <div className="menu-bar"></div>

        </div>
      </>

    );
  }
}
