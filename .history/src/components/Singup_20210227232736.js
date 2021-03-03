import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/user/create/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });
      return response;
    } catch (error) {
      console.log(error.stack);
      this.setState({
        errors: error.response.data,
      });
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
            {this.state.errors.username ? this.state.errors.username : null}
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input
               className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email ? this.state.errors.email : null}
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
            {this.state.errors.password ? this.state.errors.password : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Singup
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
