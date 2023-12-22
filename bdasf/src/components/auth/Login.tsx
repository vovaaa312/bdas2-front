import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import UserService from "../services/AuthService.tsx";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('login:',login);
    console.log('password:',password);
    if (login.length === 0 || password.length === 0) {
      console.log("Username or Password is null");
      return;
    }

    try {
      const response = await UserService.login({ login, password });

      // Проверяем, есть ли данные в ответе
      if (response) {
        console.log("Login successful");
        navigate('/');
        window.location.reload();
        // Обработайте успешный вход, сохраните данные пользователя, выполните перенаправление и т. д.
      } else {
        console.error("Login failed: Response does not contain data");
        // Обработайте ситуацию, когда ответ не содержит данных
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Обработайте ошибки, например, отобразите сообщение об ошибке пользователю
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
                    onChange={(e)=>setLogin(e.target.value)}
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