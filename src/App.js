
import React, { Component} from "react";
import { Switch, Route, Link ,withRouter} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Class from "./Pages/Class";
import Form from "./components/Form";   
import NotFound from "./components/NotFound"
import SecondLayout from "./Layout/SecondLayout";
// import Hello from "./hello";

import home from './home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar'
import { Container } from "react-bootstrap";
class App extends Component {
    
    render() {
        
        return (
            <>
            <Navbar/>
            <Container fluid={true}> 
                <Switch>
                        <Route exact path="/" component={home}  />
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/class/:id"} component={SecondLayout} />
                        <Route exact path={"/form"} component={Form} />
                        <Route exact path={"/*"} component={NotFound} />
                    </Switch>
            </Container>
          </>
        );
    }
}

export default withRouter(App);