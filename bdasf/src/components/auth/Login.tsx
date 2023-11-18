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
      <div className="login-form">
        <div>
          <h1>Login</h1>
        </div>

        <div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </div>

        <div>
          {" "}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>

        <div>
          {" "}
          <button onClick={handleLogin} type="submit">
            Login
          </button>
        </div>

        <div>
          <Link to="/registration">
            <button type="button">Registration</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
