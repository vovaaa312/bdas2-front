import { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/AuthService.tsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      console.log("Username or Password is null");
      return;
    }

    try {
      const response = await UserService.login({ username, password });
      console.log("Login successful:", response.data);
      // Handle successful login, e.g., store user data, redirect, etc.
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <>
      <div className="container">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <div className="form-group mb-2">
              <h1>Login</h1>
            </div>

            <div className="form-group mb-2">
              <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="form-control"

              />
            </div>

            <div className="form-group mb-2">
              {" "}
              <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="form-control"

              />
            </div>

            <div className="form-group mb-2">
              {" "}
              <button
                  onClick={handleLogin}
                  type="submit"
                  className="btn btn-success">
                Login
              </button>
            </div>

            <div className="form-group mb-2">
              <Link to="/registration">
                <button className="btn btn-danger" >Registration</button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Login;
