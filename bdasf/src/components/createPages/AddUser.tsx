import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {User} from "../model/security/User.tsx";
import UserService from "../services/UserService.tsx";
import PacientService from "../services/PacientService.tsx";
import ZamestnanecService from "../services/ZamestnanecService.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import {Pacient} from "../model/Pacient.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import BinaryContentService from "../services/BinaryContentService.tsx";
import {BinaryContent} from "../model/BinaryContent.tsx";

// AddPacient.tsx


const AddUser: React.FC = () => {
    const navigate = useNavigate();

    //const [roleOptions, setRoleOptions] = useState<string[]>(["USER", "ADMIN", "ZAMESTNANEC", "ZAMESTNANEC_NADRIZENY"]);
    const roleOptions = ["PACIENT", "UZIVATEL", "ADMIN", "ZAMESTNANEC", "ZAMESTNANEC_NADRIZENY"];

    const [zamestnanci, setZamestnanci] = useState<Zamestnanec[]>([]);
    const [pacienti, setPacienti] = useState<Pacient[]>([]);

    const [storedUser, setStoredUser] = useState<StorageUserData | null>(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [user, setUser] = useState<User>({
        id: 0,
        login: "",
        password: "",
        roleId: 0,
        roleName: roleOptions[0],  // Начальное значение из roleOptions
        pacientId: 0,
        zamestnanecId: 0

    });

    const {id} = useParams<{ id?: string }>();
    const userId = parseInt(id || "0");

    const usersEquals = userId == localStorage.getItem('userId');

    const [userImage, setUserImage] = useState<BinaryContent |null>(null);


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
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setStoredUser(userData);
            console.log(userData);
        }

        if (id) {
            UserService.getUserById(userId)
                .then((response) => {
                    setUser(response.data);


                    BinaryContentService.getBinaryContentByUserId(userId)
                        .then((response) => {
                            const imageData: BinaryContent = response.data; // предполагаем, что response.data уже имеет тип BinaryContent
                            console.log(userImage ? `data:${userImage.fileType};base64,${userImage.content}` : 'NO IMAGE');
                            setUserImage(imageData);
                        })
                        .catch((error) => {
                            console.error('Error loading user image:', error);
                        });

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


    const changePassword = (e: React.FormEvent) => {
        e.preventDefault();

    }

    const changeRole = () => {
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

    const changePass = () => {
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
    }

    const createPass = () => {
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
    const password = () => {
        if (id) {
            return changePass();
        } else {
            return createPass();
        }
    };


    const chngRole = () => {
        return <div className="form-group mb-2">
            <label>Role</label>
            <select
                name="role"
                className="form-control"
                value={user.roleName}
                onChange={(e) => setUser({...user, roleName: e.target.value})}
                disabled={storedUser?.roleName !== USER_ROLES.ADMIN}
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
                disabled={storedUser?.roleName !== USER_ROLES.ADMIN}

            >
                Change role
            </button>

        </div>
    }

    const createRole = () => {
        return <div className="form-group mb-2">
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
                disabled={storedUser?.roleName !== USER_ROLES.ADMIN}

            </select>


        </div>
    }
    const role = () => {
        if (storedUser?.roleName === USER_ROLES.ADMIN) {
            if (id) {
                return chngRole();
            } else {
                return createRole();
            }
        }


    }
    const changePacId = () => {

        const changePacIdRequest = {
            userId: user.id,
            newPacId: user.pacientId,
        };
        try {
            // Отправка запроса на изменение пациента
            UserService.changeUserPacId(changePacIdRequest)
                .then((response) => {
                    console.log(response.data);
                    console.log('Pacient changed successfully');
                    // Дополнительные действия после успешного изменения пациента
                    // window.location.reload();
                })
                .catch((error) => {
                    console.error('Error during pacient change:', error);
                });
        } catch (error) {
            console.error('Error during pacient change:', error);
        }
    };

    const pacientSelect = () => {
        const handlePacientChange = (e) => {
            const selectedPacientId = parseInt(e.target.value, 10);
            setUser((prevUser) => ({
                ...prevUser,
                pacientId: selectedPacientId,
            }));
        };

        return (
            <div className="form-group mb-2">
                <label>Pacient</label>
                <select
                    name="idPacient"
                    className="form-control"
                    value={user.pacientId}
                    onChange={handlePacientChange}
                    disabled={storedUser?.roleName !== USER_ROLES.ADMIN}
                >
                    {pacienti.map((pacient, index) => (
                        <option key={index} value={pacient.idPacient}>
                            {`${pacient.jmeno} ${pacient.prijmeni}`} {/* Изменение формата отображения */}
                        </option>
                    ))}
                </select>
                {changePacButton()}
            </div>
        );
    };

    const changeZamButton = () => {
        if (id) {
            return <button
                type="button"
                className="btn btn-success"
                onClick={(e) => {
                    changeZamId(e);
                }}
                disabled={storedUser?.roleName !== USER_ROLES.ADMIN}

            >
                Change zamestnanec
            </button>
        }

    }

    const changePacButton = () => {
        if (id) {
            return <button
                type="button"
                className="btn btn-success"
                onClick={(e) => {
                    changePacId(e);
                }}
                disabled={storedUser?.roleName !== USER_ROLES.ADMIN}

            >
                Change pacient
            </button>
        }

    }

    const changeZamId = () => {
        const changeZamIdRequest = {
            userId: user.id,
            newZamId: user.zamestnanecId,
        };
        try {
            // Отправка запроса на изменение сотрудника
            UserService.changeUserZamId(changeZamIdRequest)
                .then((response) => {
                    console.log(response.data);
                    console.log('Zamestnanec changed successfully');
                    // Дополнительные действия после успешного изменения сотрудника
                    // window.location.reload();
                })
                .catch((error) => {
                    console.error('Error during zamestnanec change:', error);
                });
        } catch (error) {
            console.error('Error during zamestnanec change:', error);
        }
    };


    const zamestnanectSelect = () => {
        return (
            <div className="form-group mb-2">
                <label>Zamestnanec</label>
                <select
                    name="idZamestnanec"
                    className="form-control"
                    value={user.zamestnanecId}
                    onChange={(e) => setUser({...user, zamestnanecId: parseInt(e.target.value, 10)})}
                    disabled={storedUser?.roleName !== USER_ROLES.ADMIN}

                >
                    {zamestnanci.map((zamestnanec, index) => (
                        <option key={index} value={zamestnanec.idZamestnanec}>
                            {`${zamestnanec.jmeno} ${zamestnanec.prijmeni}`} {/* Изменение формата отображения */}
                        </option>
                    ))}
                </select>
                {changeZamButton()}

            </div>
        );
    };

    const select = () => {

        // if (user.roleName === USER_ROLES.PACIENT) {
        //     return pacientSelect();
        // } else if (user.roleName === USER_ROLES.ZAMESTNANEC ||
        //     user.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
        //     return zamestnanectSelect();
        // }
        const selectedRole = user.roleName;
        if (storedUser?.roleName === USER_ROLES.ADMIN) {
            if (roleOptions.includes(selectedRole)) {
                if (selectedRole === USER_ROLES.PACIENT) {
                    return pacientSelect();
                } else if (selectedRole === USER_ROLES.ZAMESTNANEC || selectedRole === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
                    return zamestnanectSelect();
                }
            }
        }


        return null;

    }

    const back = () => {
        navigate(-1);
    }
    const buttons = () => {
        if (id) {
            return <div className="form-group mb-2">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={back}
                >
                    Back
                </button>
            </div>
        } else {
            return <div className="form-group mb-2">
                <button type="button"
                        className="btn btn-danger"
                        onClick={back}>
                    Back
                </button>

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


    const login = () => {
        return (
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
                    disabled={storedUser?.roleName !== USER_ROLES.ADMIN}
                />
            </div>
        );
    };



    const avatar = () => {
        return <div>
            {/*<textarea value={userImage ? atob(userImage.content) : ''} readOnly />*/}

            <div
                style={{
                    width: '75px',
                    height: '75px', // Updated height to make the photo display correctly
                    border: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {userImage && userImage.data ? (
                    <img
                        src={`data:${userImage.fileType};base64,${userImage.content}`}
                        alt="User"
                        style={{ maxWidth: '100%', maxHeight: '100%' }} // Ensure the image fits into the container
                    />
                ) : (
                    <p style={{ margin: '0', color: '#888' }}>NO IMAGE</p>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control"
            />
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
                Podtvrdit
            </button>
        </div>


    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Выбран файл:", file);
            setSelectedFile(file); // Сохраняем файл в состояние
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            // Assuming you have the user ID available
            const userId = storedUser?.id || 0; // Replace 0 with the default user ID if needed

            // Use BinaryContentService to upload the file
            BinaryContentService.uploadBinaryContent(selectedFile, userId)
                .then((response) => {
                    console.log("File uploaded successfully:", response);
                    // Additional actions after a successful upload
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
        } else {
            console.log("File is not selected");
        }
    };
    const content = () => {


        if (
            (storedUser?.roleName === USER_ROLES.ADMIN || // Пользователь - администратор
                (storedUser?.roleName !== USER_ROLES.ADMIN && usersEquals)) // Пользователь не администратор, но userId совпадает с авторизованным
        ) {
            return (
                <div>
                    {title()}

                    <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <div className="card-body">
                                    <form>
                                        {avatar()}
                                        {/* login */}
                                        {login()}
                                        {/* password */}
                                        {password()}

                                        {/* Combobox для Role */}
                                        {role()}

                                        {select()}

                                        {/* Добавление фотографии */}
                                        {/*{userPhoto()}*/}

                                        {buttons()}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else return <h2 className="text-center">Nedostatečná práva pro přístup k této stránce</h2>;
    };


    return content();
};

export default AddUser;
