import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmitWThen(event) {
    event.preventDefault();
    axiosInstance
      .post("/token/obtain/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + result.data.access;
        localStorage.setItem("access_token", result.data.access);
        localStorage.setItem("refresh_token", result.data.refresh);
      })
      .catch((error) => {
        throw error;
      });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/token/obtain/", {
        username: this.state.username,
        password: this.state.password,
      });
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + response.data.access;
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      return response;
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="row">
        {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form> */}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="user"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
