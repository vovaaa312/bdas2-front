import { useState } from "react";
import { Link } from "react-router-dom";
import Registration from "./Registration";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    username.length === 0
      ? console.log("Username is null")
      : console.log("Username:", username);
    password.length === 0
      ? console.log("Password is null")
      : console.log("Password:", password);
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
