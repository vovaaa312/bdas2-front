import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {User} from "../model/security/User.tsx";
import UserService from "../services/UserService.tsx";
import PacientService from "../services/PacientService.tsx";
import ZamestnanecService from "../services/ZamestnanecService.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import {Pacient} from "../model/Pacient.tsx";

// AddPacient.tsx


const AddUser: React.FC = () => {
    const navigate = useNavigate();

    //const [roleOptions, setRoleOptions] = useState<string[]>(["USER", "ADMIN", "ZAMESTNANEC", "ZAMESTNANEC_NADRIZENY"]);
    const roleOptions = ["PACIENT","UZIVATEL", "ADMIN", "ZAMESTNANEC", "ZAMESTNANEC_NADRIZENY"];

    const [zamestnanci, setZamestnanci] = useState<Zamestnanec[]>([]);
    const [pacienti, setPacienti] = useState<Pacient[]>([]);


    const [user, setUser] = useState<User>({
        id: 0,
        login: "",
        password: "",
        roleId: 0,
        roleName: roleOptions[0],  // Начальное значение из roleOptions
        idPacient:0,
        idZamestnanec:0

    });


    const {id} = useParams<{ id?: string }>();
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

        ZamestnanecService.getAllZamestnanci()
            .then((response) => {
                setZamestnanci(response.data.map((zamestnanec) => zamestnanec));
            })
            .catch((error) => {
                console.error("Error loading zamestnanci options", error);
            });

        PacientService.getAllPacienti()
            .then((response) => {
                setPacienti(response.data.map((pacient) => pacient));
            })
            .catch((error) => {
                console.error("Error loading zamestnanci options", error);
            });

    }, [id]);


    const changePassword =(e:React.FormEvent)=>{
        e.preventDefault();

    }

    const changeRole=()=>{
        const changeRoleRequest = {
            userId: user.id, // ID пользователя
            roleName: user.roleName // Новая роль пользователя
        };
        try {
            // Отправка запроса на изменение роли
             UserService.changeUserRole(changeRoleRequest);
             console.log(changeRoleRequest);
            console.log('Role changed successfully');

            // Дополнительные действия после успешного изменения роли (например, перенаправление)
          //  window.location.reload();
        } catch (error) {
            console.error('Error during role change:', error);
        }
    }
    const title = () => {
        if (id) {
            return <h2 className="text-center">Edit user</h2>;
        } else {
            return <h2 className="text-center">Add user</h2>;
        }
    };

    const password = () => {
        if (id) {
            return <div className="form-group mb-2">
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
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => {
                        changePassword(e);
                    }}
                >
                    Change password
                </button>
            </div>;
        } else {
            return <div className="form-group mb-2">
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
        }
    };

    const role=()=>{
        if (id) {
            return  <div className="form-group mb-2">
                <label>Role</label>
                <select
                    name="role"
                    className="form-control"
                    value={user.roleName}
                    onChange={(e) => setUser({...user, roleName: e.target.value})}
                >
                    {roleOptions.map((role, index) => (
                        <option key={index} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => {
                        changeRole(e);
                    }}
                >
                    Change role
                </button>

            </div>
        } else {
            return  <div className="form-group mb-2">
                <label>Role</label>
                <select
                    name="role"
                    className="form-control"
                    value={user.roleName}
                    onChange={(e) => setUser({...user, roleName: e.target.value})}
                >
                    {roleOptions.map((role, index) => (
                        <option key={index} value={role}>
                            {role}
                        </option>
                    ))}
                </select>



            </div>
        }
    }

    const select = () => {
        if (user.roleName === "PACIENT") {
            return (
                <div className="form-group mb-2">
                    <label>Pacient</label>
                    <select
                        name="idPacient"
                        className="form-control"
                        value={user.idPacient}
                        onChange={(e) => setUser({...user, idPacient: parseInt(e.target.value, 10)})}
                    >
                        {pacienti.map((pacient, index) => (
                            <option key={index} value={pacient.idPacient}>
                                {pacient.prijmeni} {/* Используйте свойство для отображения имени пациента */}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else {
            return (
                <div className="form-group mb-2">
                    <label>Zamestnanec</label>
                    <select
                        name="idZamestnanec"
                        className="form-control"
                        value={user.idZamestnanec}
                        onChange={(e) => setUser({...user, idZamestnanec: parseInt(e.target.value, 10)})}
                    >
                        {zamestnanci.map((zamestnanec, index) => (
                            <option key={index} value={zamestnanec.idZamestnanec}>
                                {zamestnanec.prijmeni} {/* Используйте свойство для отображения имени сотрудника */}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }
    }

    const buttons=()=>{
        if (id) {
            return  <div className="form-group mb-2">
                <Link to="/users">
                    <button type="button" className="btn btn-danger">
                        Back
                    </button>
                </Link>
            </div>
        } else {
            return   <div className="form-group mb-2">
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
        }
    }

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
                                {password()}
                                {/*<div className="form-group mb-2">*/}
                                {/*    <label>Password</label>*/}
                                {/*    <input*/}
                                {/*        placeholder="-"*/}
                                {/*        type="password"*/}
                                {/*        name="password"*/}
                                {/*        className="form-control"*/}
                                {/*        value={user.password}*/}
                                {/*        onChange={(e) =>*/}
                                {/*            setUser((prevUser) => ({*/}
                                {/*                ...prevUser,*/}
                                {/*                password: e.target.value,*/}
                                {/*            }))*/}
                                {/*        }*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/* Combobox для Role */}
                                {role()}
                                {/*<div className="form-group mb-2">*/}
                                {/*    <label>Role</label>*/}
                                {/*    <select*/}
                                {/*        name="role"*/}
                                {/*        className="form-control"*/}
                                {/*        value={user.roleName}*/}
                                {/*        onChange={(e) => setUser({...user, roleName: e.target.value})}*/}
                                {/*    >*/}
                                {/*        {roleOptions.map((role, index) => (*/}
                                {/*            <option key={index} value={role}>*/}
                                {/*                {role}*/}
                                {/*            </option>*/}
                                {/*        ))}*/}
                                {/*    </select>*/}
                                {/*</div>*/}

                                {select()}

                                {buttons()}
                                {/*<div>*/}
                                {/*    <Link to="/users">*/}
                                {/*        <button type="button" className="btn btn-danger">*/}
                                {/*            Back*/}
                                {/*        </button>*/}
                                {/*    </Link>*/}

                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="btn btn-success"*/}
                                {/*        onClick={(e) => {*/}
                                {/*            saveOrUpdateUser(e);*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        Submit*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
