// UserList.tsx
import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import UserService from "../services/UserService.tsx";
import {User} from "../model/security/User.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
const UserList: React.FC = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);


    useEffect(() => {

        getAllUsers();
    }, [user]);

    const handleEmulateClick = (userId: number) => {
        UserService.getUserById(userId)
            .then((response) => {
                const getUser = response.data;



                localStorage.setItem('userId', getUser.id.toString());
                localStorage.setItem('login', getUser.login);
                localStorage.setItem('roleName', getUser.roleName);

                if (getUser.zamestnanecId) {
                    localStorage.setItem('zamId', getUser.zamestnanecId.toString());
                }
                if (getUser.pacientId) {
                    localStorage.setItem('pacId', getUser.pacientId.toString());
                }


                window.sessionStorage.setItem('authenticated', 'true');
                navigate('/');
                window.location.reload();

            })
            .catch((error) => {
                console.error('Ошибка при получении данных пользователя:', error);
            });
    };

    const getAllUsers = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            UserService.getAllUsers()
                .then((response) => {
                    setUserList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };

    const deleteUser = (userId: number) => {
        if (!userId) {
            console.log("User ID is undefined or invalid");
            return;
        }

        UserService.deleteUser(userId)
            .then(() => {
                getAllUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pageTitle = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <h1>Users</h1>
        }
        else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    const addButton=()=>{
        if (user?.roleName === USER_ROLES.ADMIN) {
            return             <div>
                <Link to="/add-user">
                    <button className="btn btn-info" type="button">
                        Add user
                    </button>
                </Link>
            </div>
        }

    }

    const table=()=>{
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">LOGIN</th>
                    <th scope="col">PASSWORD</th>
                    <th scope="col">ROLE</th>
                    <th scope="col">ACTIONS</th>





                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {userList.map((user) => (
                    <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>{user.password}</td>
                        <td>{user.roleName}</td>
                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit-user/${user.id}`}
                            >
                                Update
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteUser(user.id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => handleEmulateClick(user.id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Spustit emulace
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        }
        }


    return (
        <div>
            {pageTitle()}
            {addButton()}
            {table()}

        </div>
    );
};

export default UserList;
