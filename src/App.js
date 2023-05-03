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
import Quiz from "./Quiz/Quiz";
import Quiz_2 from "./Quiz/Quiz_2";
import UserArticleList from "./Articles/UserArticleList";
import PublicArticles from "./Articles/PublicArticles";
import EditArticle from "./Articles/EditArticle";

import TextEditor from "./TextEditor";
import NotFound from "./components/NotFound";
import Editor from "./components/Editor/Editor";
import Home from "./components/HomePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import UserArticleView from "./Articles/UserArticleView";
import PublicArticleView from "./Articles/PublicArticleView";
import ManageQuizPage from "./Quiz_Instructor/ManageQuizPage";
import CreateQuiz from "./Quiz_Instructor/CreateQuiz";
import UpdateQuiz from "./Quiz_Instructor/UpdateQuiz";
import Courses from "../src/Courses/Courses";
import CoursePage from "../src/Courses/CoursePage";
import Exam from "../src/Courses/exam/Exam";
import Profile from "./components/Profile";
import Overview from "./Courses/Overview/Overview";

const App = () => {
  const location = useLocation();
  const username = localStorage.getItem('user-id')
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
                {/* <Route exact path={"/class/:id"} component={SecondLayout} /> */}
                <Route exact path={"/user/profile"} component={username ? Profile : Login} />
                <Route
                  exact
                  path={"/tutorial/:tutorialTitle"}
                  component={TutorialPage}
                ></Route>
                <Route exact path="/bhav-tutorials">
                  <Redirect to="/tutorial/bhav-programming-language"></Redirect>
                </Route>
                <Route exact path={"/courses"} component={Courses} />
                <Route exact path={"/course/:course_id"} component={username ? CoursePage : Overview} />
                <Route
                  exact
                  path={"/course/:course_id/course_overview"}
                  component={Overview }
                />
                <Route
                  exact
                  path={"/course/:course_id/:exam_id"}
                  component={username ? Exam : Home}
                />
                <Route exact path={"/articles"} component={PublicArticles} />
                <Route exact path={"/quiz"} component={Quiz} />
                <Route exact path={"/quiz_2"} component={Quiz_2} />
                <Route exact path={"/manage-quiz"} component={ManageQuizPage} />
                <Route exact path={"/create-quiz"} component={CreateQuiz} />
                <Route
                  exact
                  path={"/update-quiz/:quiz_id"}
                  component={UpdateQuiz}
                />
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
                <Route exact path={"/write"} component={TextEditor} />
                <Route exact path={"/*"} component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(App);
