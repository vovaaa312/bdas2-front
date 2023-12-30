// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";

const PacientiAnalyzyList: React.FC = () => {
        const [pacientiAnalyzyList, setPacientiAnalyzyList] = useState<PacientAnalyza[]>([]);
        const [user, setUser] = useState<StorageUserData | null>(null);

        useEffect(() => {

            const userData = LocalStorageService.getUserFromLocalStorage();
            if (userData) {
                setUser(userData);
            }
        }, []);
        useEffect(() => {


            getAllAnalyzy();
        }, [user]);






    const getAllAnalyzy = () => {
            if (user?.roleName === USER_ROLES.ADMIN) {
                PacientAnalyzaService.getAllAnalyzy()
                    .then((response) => {
                        setPacientiAnalyzyList(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (user?.roleName === USER_ROLES.PACIENT) {

                PacientAnalyzaService.getByPacientId(user.pacientId)
                    .then((response) => {
                        setPacientiAnalyzyList(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (user?.roleName === USER_ROLES.ZAMESTNANEC || user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
                //ВОТ ТУТ
                console.log(user.zamestnanecId);
                ZamestnanecDataService.getZamestnanecById(user.zamestnanecId)
                    .then((response) => {
                        const zamestnanecData = response.data;
                        PacientAnalyzaService.getByOddeleniId(zamestnanecData.idOddeleni)
                            .then((response) => {
                                setPacientiAnalyzyList(response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });


                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }

        };
        const deleteAnalyza = (analyzaId: number) => {
            PacientAnalyzaService.deleteAnalyza(analyzaId)
                .then(() => {
                    getAllAnalyzy();
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const formatDate = (date: Date) => {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            };
            return new Intl.DateTimeFormat("en-US", options).format(date);
        };

        const pageTitle = () => {
            if (user?.roleName === USER_ROLES.ADMIN) {
                return <h1>Analyzy pacientu</h1>

            } else if (user?.roleName === USER_ROLES.PACIENT) {
                return <h1>Analyzy pacienta</h1>
            } else if (user?.roleName === USER_ROLES.ZAMESTNANEC ||
                user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
                return <h1>Analyzy pacientu</h1>

            } else
                return <h1>K těmto údajům nemáte přístup</h1>

        }

        const updateButton = (id: number) => {
            if (user?.roleName !== USER_ROLES.PACIENT) {
                return <Link
                    className="btn btn-info"
                    to={`/edit-pacient-analyza/${id}`}
                >
                    Update
                </Link>
            }
        }

        const deleteButton = (id: number) => {
            if (user?.roleName === USER_ROLES.ADMIN) {
                return <button
                    className="btn btn-danger"
                    onClick={() => deleteAnalyza(id)}
                    style={{marginLeft: "10px"}}
                >
                    Delete
                </button>
            }
        }

        const addAnalyzaButton = () => {
            if (user?.roleName !== USER_ROLES.UZIVATEL &&
                user?.roleName !== USER_ROLES.PACIENT) {
                return <div>
                    <Link to="/add-pacient-analyza">
                        <button className="btn btn-info" type="button">
                            Add analyza
                        </button>
                    </Link>
                </div>
            }

        }



        return (
            <div>
                {pageTitle()}
                {addAnalyzaButton()}
                <table className="table table-bordered">
                    <thead>
                    <tr>

                        <th scope="col">JMENO</th>
                        <th scope="col">PRIJMENI</th>
                        <th scope="col">CISLO TELEFONU</th>
                        <th scope="col">POHLAVI</th>

                        <th scope="col">RBC</th>
                        <th scope="col">WBC</th>
                        <th scope="col">HGB</th>
                        <th scope="col">PLT</th>

                        <th scope="col">DATUM</th>
                        <th scope="col">ACTIONS</th>


                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                    </thead>
                    <tbody>
                    {pacientiAnalyzyList.map((pacientAnalyza) => (
                        <tr key={pacientAnalyza.idAnalyza}>

                            <td>{pacientAnalyza.jmeno}</td>
                            <td>{pacientAnalyza.prijmeni}</td>
                            <td>{pacientAnalyza.cisloTelefonu}</td>
                            <td>{pacientAnalyza.pohlavi}</td>
                            <td>{pacientAnalyza.rbc}</td>
                            <td>{pacientAnalyza.wbc}</td>
                            <td>{pacientAnalyza.hgb}</td>
                            <td>{pacientAnalyza.plt}</td>
                            <td>{formatDate(new Date(pacientAnalyza.datum))}</td>


                            <td>
                                {updateButton(pacientAnalyza.idAnalyza)}
                                {deleteButton(pacientAnalyza.idAnalyza)}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
;

export default PacientiAnalyzyList;
