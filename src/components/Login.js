import React, { Component } from "react";
import { Alert, Fade } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axiosInstance from "../axiosApi";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", alert: false, token: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    localStorage.setItem("user-id", this.state.username);
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

      if (response.data.access === undefined) {
        this.setState({ alert: true });
        setTimeout(() => {
          this.setState({ alert: false });
        }, 5000);
      } else {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;

        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        this.setState({ token: localStorage.getItem("access_token") });
        console.log(response.data);
        this.props.history.push("/");
      }

      return response;
    } catch (error) {
      this.setState({ alert: true });
      setTimeout(() => {
        this.setState({ alert: false });
      }, 5000);
      throw error;
    }
  }

  render() {
    return (
      <div className="row">
        <form
          onSubmit={this.handleSubmit}
          style={{ margin: " 0 auto", textAlign: "left", width: "800px" }}
        >
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
            <label for="exampleInputPassword1">
              Password ( must be more than 8 letters)
            </label>
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

          {this.state.alert && (
            <Alert variant="danger">Enter valid username and password</Alert>
          )}

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
