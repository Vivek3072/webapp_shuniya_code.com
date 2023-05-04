import axios from "axios";
import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://43.204.229.206:8000/api/v1/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          first_name: "Vivek",
          last_name: "Srivastava",
        }),
      }
    );
    console.log(response, "response");
    // setError(response.email);
  };

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          {error && error}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={registerUser}
          >
            Singup
          </button>
        </form>
      </div>
    </>
  );
}
