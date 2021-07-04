import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  withRouter,
  useLocation,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Singup";
import HomePage from "./homepage";
import BhavTutorial from "./BhavTutorial/BhavTutorial";
import TutorialPage from "./BhavTutorial/components/TutorialPage";
import Quiz from "./Quiz/Quiz";
import Quiz_2 from "./Quiz/Quiz_2";
import UserArticleList from "./Articles/UserArticleList";
import PublicArticles from "./Articles/PublicArticles";
import EditArticle from "./Articles/EditArticle";

import Class from "./Pages/Class";

import TextEditor from "./TextEditor";
import NotFound from "./components/NotFound";
import SecondLayout from "./Layout/SecondLayout";
// import Hello from "./hello";

import home from "./home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import UserArticleView from "./Articles/UserArticleView";
import PublicArticleView from "./Articles/PublicArticleView";
import firebase from "firebase";
import ManageQuizPage from "./Quiz_Instructor/ManageQuizPage";
import CreateQuiz from "./Quiz_Instructor/CreateQuiz";

firebase.initializeApp({
  apiKey: "AIzaSyC065TVIqadZfzSI8bVWlsUgYegZGSDlVE",
  authDomain: "xn--11by0j.firebaseapp.com",
});

const App = () => {
  const location = useLocation();

  return (
    <div className='page-container'>
      <div className='content-wrap'>
      <Navbar />
      <Container fluid={true}>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Switch location={location}>
              <Route exact path="/" component={home} />
              <Route exact path={"/login/"} component={Login} />
              <Route exact path={"/signup/"} component={Signup} />
              <Route exact path={"/class/:id"} component={SecondLayout} />
              <Route
                exact
                path={"/tutorial/:tutorialTitle"}
                component={TutorialPage}
              ></Route>
              <Route exact path="/bhav-tutorials">
                <Redirect to="/tutorial/bhav-programming-language"></Redirect>
              </Route>
              <Route exact path={"/articles"} component={PublicArticles} />
              <Route exact path={"/quiz"} component={Quiz} />
              <Route exact path={"/quiz_2"} component={Quiz_2} />
              <Route exact path={"/manage-quiz"} component={ManageQuizPage} />
              <Route exact path={"/create-quiz"} component={CreateQuiz} />
              <Route
                exact
                path={"/article/user/:user_id/:article_no"}
                component={UserArticleView}
              ></Route>
              <Route
                exact
                path={"/edit/:user_id/:article_no"}
                component={EditArticle}
              ></Route>
              <Route
                exact
                path={"/article/public/:article_no"}
                component={PublicArticleView}
              ></Route>
              <Route
                exact
                path={"/my-articles"}
                component={UserArticleList}
              ></Route>
              <Route exact path={"/homepage"} component={HomePage} />
              <Route exact path={"/write"} component={TextEditor} />
              <Route exact path={"/*"} component={NotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <br/>
      <br/>
      </div>
      <Footer/>
    </div>
  );
};

export default withRouter(App);
