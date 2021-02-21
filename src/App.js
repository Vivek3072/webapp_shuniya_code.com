import React from "react";
import { Link, Route, BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import './App.css';
import Editor from "./components/Editor";
import code_editor from "./reducers/code_editor";
import store from './store'

function App() {
  return (
    <div className="App">
       <BrowserRouter basename="/">
         <Route exact path="/code" component={Editor}  />
       </BrowserRouter>
    </div>
  );
}

export default App;
