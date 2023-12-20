import  {FormEvent, useState} from 'react';
import {Link} from "react-router-dom";

function TestLogin() {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const handleLogin = (e: FormEvent) => {
        e.preventDefault();

        console.log(user);
        console.log(pass);
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
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                placeholder="Username"
                                className="form-control"

                            />
                        </div>

                        <div className="form-group mb-2">
                            {" "}
                            <input
                                onChange={(e) => setPass(e.target.value)}
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
                                <button className="btn btn-danger">Registration</button>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}


export default TestLogin;

