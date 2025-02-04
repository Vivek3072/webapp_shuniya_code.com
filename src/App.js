import React from "react";
import {
  Switch,
  Route,
  withRouter,
  useLocation,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import TutorialPage from "./BhavTutorial/components/TutorialPage";
import NotFound from "./components/NotFound";
import Editor from "./components/Editor/Editor";
import Home from "./components/HomePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Courses from "../src/Courses/Courses";
import CoursePage from "../src/Courses/CoursePage";
import Quiz from "./Courses/exam/Quiz";
import Profile from "./components/Profile";
import Overview from "./Courses/Overview/Overview";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/LegalDocs/PrivacyPolicy";
import TermsConditions from "./components/LegalDocs/TermsConditions";
import About from "./components/About/About";
import RefundPolicy from "./components/LegalDocs/RefundPolicy";
import Preparation from "./Preparation/Preparation";
import CodeRunner from "./CodeRunner/CodeRunner";
import PracticeQuestions from "./Preparation/Practice questions/PracticeQuestions";

const App = () => {
  const location = useLocation();
  const current_user_id = localStorage.getItem("user_id");
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/editor" component={Editor} />
              <Route exact path={"/login/"} component={Login} />
              <Route exact path={"/signup"} component={Signup} />
              <Route exact path={"/about"} component={About} />
              <Route
                exact
                path={"/user/profile"}
                component={current_user_id ? Profile : Login}
              />
              <Route
                exact
                path={"/tutorial/:tutorialTitle"}
                component={TutorialPage}
              ></Route>
              <Route exact path="/bhav-tutorials">
                <Redirect to="/tutorial/bhav-programming-language"></Redirect>
              </Route>
              {/* //solve challenge code editor page route  */}
              <Route
                exact
                path={"/challenge/:questionCode/:limit"}
                component={CodeRunner}
              />
              <Route exact path={"/preparation"} component={Preparation} />
              <Route
                exact
                path={"/practice_questions"}
                component={PracticeQuestions}
              />

              {/* // voice recognition */}
              {/* <Route exact path={"/voice_recognition"} component={IndexVoice} /> */}

              <Route exact path={"/courses"} component={Courses} />
              <Route exact path={"/course/:course_id"} component={CoursePage} />
              <Route
                exact
                path={"/course/:course_id/course_overview"}
                component={Overview}
              />
              <Route
                exact
                path={"/course/:course_id/:quiz_id"}
                component={current_user_id ? Quiz : Home}
              />
              <Route exact path={"/contact"} component={Contact} />
              <Route exact path={"/privacy-policy"} component={PrivacyPolicy} />
              <Route exact path={"/refund-policy"} component={RefundPolicy} />
              <Route
                exact
                path={"/terms-conditions"}
                component={TermsConditions}
              />
              <Route exact path={"/*"} component={NotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        {/* <br />
        <br /> */}
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(App);
