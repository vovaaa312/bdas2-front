// UserList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService.tsx";
import {User} from "../model/security/User.tsx";
const UserList: React.FC = () => {
    const [userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        UserService.getAllUsers()
            .then((response) => {
                setUserList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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


    return (
        <div>
            <h1>Users</h1>
            <div>
                <Link to="/add-user">
                    <button className="btn btn-info" type="button">
                        Add user
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
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
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
