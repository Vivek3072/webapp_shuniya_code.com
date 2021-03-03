import React, { Component } from "react";
import axios from "axios";
import './Index.css'
import FilterOptions from './filteroptions';
import FilterItems from './filteritems';
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      showtext: "",
      isSubmited: false,
      isloaded: false,
      data: filterData,
      bender: '',
      nation: '',
      person: '',
      show: '',
       filterData : [
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
        { name: 'Momo', bender: 'no', nation: 'Air',  person: 'no', show: 'ATLA'},
        { name: 'Mai', bender: 'no', nation: 'Fire', person: 'yes', show: 'ATLA' },
        { name: 'Mako', bender: 'yes', nation: 'Fire', person: 'yes', show: 'LOK' },
        { name: 'Naga', bender: 'no', nation: 'Water', person: 'no', show: 'LOK'},
        { name: 'Sokka', bender: 'no', nation: 'Water', person: 'yes', show: 'ATLA' },
        { name: 'Suki', bender: 'no', nation: 'Earth', person: 'yes', show: 'ATLA' },
        { name: 'Tenzin', bender: 'yes', nation: 'Air', person: 'yes', show: 'LOK' },
        { name: 'Toph Beifong', bender: 'yes', nation: 'Earth', person: 'yes', show: 'ATLA' },
        { name: 'Ty Lee', bender: 'no', nation: 'Fire', person: 'yes', show: 'ATLA' },
        { name: 'Uncle Iroh', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' },
        { name: 'Varrick', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
        { name: 'Zhu Li', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
        { name: 'Zuko', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' }],
      
    };
  }
  filterItems=(val, type)=> {
    switch (type) {
     case 'bender':
       this.setState({bender: val});
       break;
     case 'nation':
       this.setState({nation: val});
       break;
     case 'person': 
       this.setState({person: val});
       break;
     case 'show':
       this.setState({show: val});
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
    var getText = document.getElementById("texteditor").value;
    console.log(getText);
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
        "http://ec2-13-232-16-70.ap-south-1.compute.amazonaws.com:8000/api/v1/web_ide/",
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
  login=()=>{
    this.props.history.push('/login')
}
  render() {
    const token=localStorage.getItem('access_token');
    var filteredItems = this.props.data;
    var state = this.state;
    ["bender", "nation", "person", "show"].forEach(function(filterBy) {
      var filterValue = state[filterBy];
      if (filterValue) {
        filteredItems = filteredItems.filter(function(item) {
          return item[filterBy] === filterValue;
        });
      }
    });
    var benderArray = this.props.data.map(function(item) { return item.bender });
    var nationArray = this.props.data.map(function(item) { return item.nation });
    var personArray = this.props.data.map(function(item) { return item.person });
    var showArray = this.props.data.map(function(item) { return item.show });
    benderArray.unshift("");
    nationArray.unshift("");
    personArray.unshift("");
    showArray.unshift("");
    return (
      <div className="row">
        <br></br>
        <br></br>
         
            <div className="col-sm-12 col-md-12 col-lg-12">
          {token? null : <button type="button" className="btn btn-secondary userLogin" onClick={this.login}>Login</button>}

          <FilterOptions 
            data={this.state.data} 
            benderOptions={benderArray} 
            nationOptions={nationArray}
            personOptions={personArray}
            showOptions={showArray}
            changeOption={this.filterItems} />
          <div className="filter-form">
          <FilterItems data={filteredItems} />
        </div>
              <h1>कोड</h1>
              <textarea id="texteditor" className="editorArea">
                पश्य("नमस्ते दुनिया !!")
              </textarea>
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
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="menu-bar"></div>
              <br></br>
              <br></br>
              <br></br>
              {this.state.isSubmited ? (
                <div>
                  <h1>परिणाम</h1>
                  {this.state.isloaded ? (
                    <textarea className="sub" value={this.state.showtext}>
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
    );
  }
}
