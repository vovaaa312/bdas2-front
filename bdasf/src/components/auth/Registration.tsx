import { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/AuthService.tsx";
import {UserRole} from "../model/security/UserRole.tsx";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleLogin = async () => {
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

    const role = UserRole.USER;
    try {
      const response = await UserService.register({ username, password ,role});
      console.log("Register successful:", response.data);
      // Handle successful login, e.g., store user data, redirect, etc.
    } catch (error) {
      console.error("Register failed:", error);
      // Handle errors, e.g., show an error message to the user
    }
  };
  return (
    <>

      <div className="container">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <div className="form-group mb-2">
              <h1>Registration</h1>
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
              <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                  className="form-control"

              />
            </div>



            <div className="form-group mb-2">
              {" "}
              <button onClick={handleLogin} type="submit"className="btn btn-success">
                Register
              </button>
            </div>

            <div className="form-group mb-2">
              <Link to="/login">
                <button className="btn btn-danger" >Back to login</button>
              </Link>
            </div>

          </div>
        </div>

      </div>



    </>
  );
}

export default Registration;
