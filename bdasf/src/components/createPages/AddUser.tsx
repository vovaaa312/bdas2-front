import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {User} from "../model/security/User.tsx";
import UserService from "../services/UserService.tsx";

// AddPacient.tsx

const AddUser: React.FC = () => {
    const navigate = useNavigate();

    //const [roleOptions, setRoleOptions] = useState<string[]>(["USER", "ADMIN", "ZAMESTNANEC", "ZAMESTNANEC_NADRIZENY"]);
    const roleOptions = ["USER", "ADMIN", "ZAMESTNANEC", "ZAMESTNANEC_NADRIZENY"];


    const [user, setUser] = useState<User>({
        id: 0,
        login: "",
        password: "",
        roleId: 0,
        roleName: roleOptions[0]  // Начальное значение из roleOptions
    });


    const { id } = useParams<{ id?: string }>();
    const userId = parseInt(id || "0");

    const saveOrUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update existing user
            UserService.updateUser(userId, user)
                .then((response) => {
                    console.log(response.data);
                    navigate("/users");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new user
            console.log(user);
            UserService.createUser(user)
                .then((response) => {
                    console.log(response.data);
                    navigate("/users");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            UserService.getUserById(userId)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update user</h2>;
        } else {
            return <h2 className="text-center">Add user</h2>;
        }
    };

    return (
        <div>
            {title()}

            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>

                                {/*/!*userId*!/*/}
                                {/*<div className="form-group mb-2">*/}
                                {/*    <label>Id user</label>*/}
                                {/*    <input*/}
                                {/*        placeholder="-"*/}
                                {/*        type="number"*/}
                                {/*        name="userId"*/}
                                {/*        className="form-control"*/}
                                {/*        value={user.userId}*/}
                                {/*        onChange={(e) =>*/}
                                {/*            setUser((prevUser) => ({*/}
                                {/*                ...prevUser,*/}
                                {/*                userId: parseInt(e.target.value, 10),*/}
                                {/*            }))*/}
                                {/*        }*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/* login */}
                                <div className="form-group mb-2">
                                    <label>Login</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="login"
                                        className="form-control"
                                        value={user.login}
                                        onChange={(e) =>
                                            setUser((prevUser) => ({
                                                ...prevUser,
                                                login: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* password */}
                                <div className="form-group mb-2">
                                    <label>Password</label>
                                    <input
                                        placeholder="-"
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={user.password}
                                        onChange={(e) =>
                                            setUser((prevUser) => ({
                                                ...prevUser,
                                                password: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Combobox для Role */}
                                <div className="form-group mb-2">
                                    <label>Role</label>
                                    <select
                                        name="role"
                                        className="form-control"
                                        value={user.roleName}
                                        onChange={(e) => setUser({ ...user, roleName: e.target.value })}
                                    >
                                        {roleOptions.map((role, index) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div>
                                    <Link to="/users">
                                        <button type="button" className="btn btn-danger">
                                            Back
                                        </button>
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => {
                                            saveOrUpdateUser(e);
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
