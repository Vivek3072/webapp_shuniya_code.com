


import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Singup";
// import Hello from "./hello";

import axiosInstance from "./axiosApi";

import home from './home'


class App extends Component {

   
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };
   

    render() {
        const token=localStorage.getItem('access-token');
        console.log()
        return (
            <div className="App">
                <nav>
                {token ? <button onClick={this.handleLogout}>Logout</button>:<Link to="/login">Login</Link> }   
                    
                </nav>
                    <Switch>
                     <Route exact path="/" component={home}  />
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                    </Switch>
               
            </div>
        );
    }
}

export default App;