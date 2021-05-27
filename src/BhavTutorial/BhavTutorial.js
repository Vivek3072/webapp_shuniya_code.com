import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import TutorialPage from "./components/TutorialPage";

function BhavTutorial() {
  const location = useLocation();
  return (
    <Router>
      <Switch location={location}></Switch>
    </Router>
  );
}

export default BhavTutorial;
