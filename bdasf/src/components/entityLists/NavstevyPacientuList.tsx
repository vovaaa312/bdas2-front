// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NavstevaPacienta} from "../model/NavstevaPacienta.tsx";
import NavstevyPacientuService from "../services/NavstevyPacientuService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";

const NavstevyPacientuList: React.FC = () => {
    const [navstevyList, setNavstevyList] = useState<NavstevaPacienta[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);


    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);// Пустой массив зависимостей, чтобы выполнять только один раз при монтировании


    useEffect(() => {

        getAllNavstevy();

    }, [user]);


    const getAllNavstevy = () => {

        if (user?.roleName === USER_ROLES.ADMIN) {

            NavstevyPacientuService.getAllNavstevy()
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user?.roleName === USER_ROLES.PACIENT) {
            NavstevyPacientuService.getByPacientId(user.pacientId)
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC) {

            NavstevyPacientuService.getByZamestnanecId(user.zamestnanecId)
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);


                });
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {

            console.log('asdasdasdasd');
            ZamestnanecDataService.getZamestnanecById(user.zamestnanecId)
                .then((response) => {
                    const zamestnanecData = response.data;
                    NavstevyPacientuService.getByOddeleniId(zamestnanecData.idOddeleni)
                        .then((response) => {
                            setNavstevyList(response.data);


                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    // Дальше вы можете использовать zamestnanecData по вашей необходимости
                })
                .catch((error) => {
                    console.log(error);
                });


        }


    };

    const pageTitle = () => {
        console.log("asdasdasd")
        if(user?.roleName!==USER_ROLES.UZIVATEL && user){
            return <h1>Navstevy pacientu</h1>
        }
        return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    function deleteNavsteva(idNavsteva: number) {
        NavstevyPacientuService.deleteNavsteva(idNavsteva)
            .then(() => {
                getAllNavstevy();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function table() {
        if(user?.roleName!==USER_ROLES.UZIVATEL && user){
            return <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">DATUM</th>
                    <th scope="col">PROBLEM</th>
                    <th scope="col">REKOMENDACE</th>
                    <th scope="col">JMENO PACIENTA</th>
                    <th scope="col">PRIJMENI PACIENTA</th>
                    <th scope="col">KONTAKT NA PACIENTA</th>
                    <th scope="col">JMENO ZAMESTNANCE</th>
                    <th scope="col">PRIJMENI ZAMESTNANCE</th>
                    <th scope="col">KONTAKT NA ZAMESTNANCE</th>

                    <th scope="col">STATUS</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {navstevyList.map((navsteva) => (
                    <tr key={navsteva.idNavsteva}>
                        {/*<td>{formatDate(new Date(navsteva.datum))}</td>*/}
                        <td>{navsteva.datum}</td>

                        <td>{navsteva.problem}</td>
                        <td>{navsteva.rekomendace}</td>
                        <td>{navsteva.pacientJmeno}</td>
                        <td>{navsteva.pacientPrijmeni}</td>
                        <td>{navsteva.pacientCisloTelefonu}</td>
                        <td>{navsteva.zamestnanecJmeno}</td>
                        <td>{navsteva.zamestnanecPrijmeni}</td>
                        <td>{navsteva.zamestnanecCisloTelefonu}</td>
                        <td>{navsteva.status}</td>
                        <td>
                            {updateButton(navsteva.idNavsteva)}
                            {deleteButton(navsteva.idNavsteva)}
                        </td>

                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                ))}
                </tbody>
            </table>
        }

    }

    function updateButton(id: number) {
        if (user?.roleName === USER_ROLES.UZIVATEL ||
            user?.roleName === USER_ROLES.PACIENT) {
            return null;
        } else return <Link
            className="btn btn-info"
            to={`/edit-navsteva/${id}`}
        >
            Update
        </Link>
    }

    function deleteButton(id: number) {
        if (user?.roleName === USER_ROLES.UZIVATEL ||
            user?.roleName === USER_ROLES.PACIENT) {
            return null;
        } else
            return <button
                className="btn btn-danger"
                onClick={() => deleteNavsteva(id)}
                style={{marginLeft: "10px"}}
            >
                Delete
            </button>

    }

    const addNavstevaButton = () => {
        if (user?.roleName !== USER_ROLES.UZIVATEL &&
            user?.roleName !== USER_ROLES.PACIENT && user) {
            return            <div>
                <Link to="/add-navsteva">
                    <button className="btn btn-info" type="button">
                        Add navsteva
                    </button>
                </Link>
            </div>
        }
    }



    return (
        <div>
            {pageTitle()}
            {addNavstevaButton()}
            {table()}

        </div>
    );
};

export default NavstevyPacientuList;
