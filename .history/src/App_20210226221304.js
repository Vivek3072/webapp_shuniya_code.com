import React from "react";
import { Link, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import home from './home'

function App() {
  return (
    <div className="App">
       <BrowserRouter basename="/">
         <Route exact path="/" component={home}  />
         

         <Route exact path={"/login/"} component={Login}/>
   <Route exact path={"/signup/"} component={Signup}/>
       </BrowserRouter>
    </div>
  );
}

export default App;
