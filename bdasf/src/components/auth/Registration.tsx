import { useState } from "react";
import { Link } from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    // Handle the login logic here
    username.length === 0
      ? console.log("Username is null")
      : console.log("Username:", username);
    password.length === 0
      ? console.log("Password is null")
      : console.log("Password:", password);

    password.length === 0
      ? console.log("Confirm password is null")
      : console.log("Conf password:", confirmPassword);

    password === confirmPassword
      ? console.log("Passwords are equal")
      : console.log("Passwords are not equal");
  };
  return (
    <>
      <div className="login-form">
        <div>
          <h1>Registration</h1>
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
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <div>
          {" "}
          <button onClick={handleLogin} type="submit">
            Register
          </button>
        </div>

        <div>
          <Link to="/login">
            <button type="button">Back to login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Registration;
