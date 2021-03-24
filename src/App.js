
import React, { Component} from "react";
import { Switch, Route, Link ,withRouter, useLocation} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Singup";
import HomePage from './homepage'

import Class from "./Pages/Class";
 
import TextEditor from './TextEditor'; 
import NotFound from "./components/NotFound"
import SecondLayout from "./Layout/SecondLayout";
// import Hello from "./hello";

import home from './home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar'
import { Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const App = () => {
    const location = useLocation();
        return (
            <>
            <Navbar/>
            <Container fluid={true}> 
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <Switch location= {location} >
                        <Route exact path="/" component={home}  />
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/class/:id"} component={SecondLayout} />
                        <Route exact path={"/homepage"} component={HomePage} />
                        <Route exact path={"/write"} component={ TextEditor} />
                        <Route exact path={"/*"} component={NotFound} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
                
            </Container>
          </>
        );
    }


export default withRouter(App);