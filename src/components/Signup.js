import React from "react";

export default function Signup() {
  return (
    <>
      <div className="row">
        <form style={{ margin: " 0 auto", textAlign: "left", width: "800px" }}>
          <div className="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="user"
              name="username"
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Singup
          </button>
        </form>
      </div>
    </>
  );
}
