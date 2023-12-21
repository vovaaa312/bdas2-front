// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PacientKarta} from "../model/PacientKarta.tsx";
import PacientKataService from "../services/PacientKartaService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import ZamestnanecService from "../services/ZamestnanecService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";

const PacientiKartyList: React.FC = () => {
    const [pacientiKartyList, setPacientiKartyList] = useState<PacientKarta[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);
    const [zamestnanec, setZamestnanec] = useState<Zamestnanec>();


    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        getAllKarty();

    }, [user]);

    const getAllKarty = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            PacientKataService.getAllPacienti()
                .then((response) => {
                    setPacientiKartyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            ZamestnanecDataService.getZamestnanecById(user.zamestnanecId)
                .then((response) => {
                    const zamestnanecData = response.data;
                    PacientKataService.getByOddeleniId(zamestnanecData.idOddeleni)
                        .then((response) => {
                            setPacientiKartyList(response.data);
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


    const deletePacient = (kartaId: number) => {
        PacientKataService.deleteKarta(kartaId)
            .then(() => {
                getAllKarty();
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

    function addKartaButton() {
        if (user?.roleName === USER_ROLES.ADMIN||
            user?.roleName === USER_ROLES.ZAMESTNANEC ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return <div>

                <Link to="/add-pacient-karta">
                    <button className="btn btn-info" type="button">
                        Add karta
                    </button>
                </Link>
            </div>
        }
    }

    const pageTitle = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return    <h1>Karty pacientu</h1>
        }
        else if (user?.roleName === USER_ROLES.ZAMESTNANEC||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return    <h1>Karty pacientu</h1>
        }
        else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    function updateButton(idKarta: number) {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <Link
                className="btn btn-info"
                to={`/edit-pacient-karta/${idKarta}`}
            >
                Update
            </Link>
        }
    }

    function deleteButton(idKarta: number ) {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return                             <button
                className="btn btn-danger"
                onClick={() => deletePacient(idKarta)}
                style={{marginLeft: "10px"}}
            >
                Delete
            </button>
        }

    }

    return (
        <div>
            {pageTitle()}
            {addKartaButton()}

            <table className="table table-bordered">
                <thead>
                <tr>

                    <th scope="col">JMENO</th>
                    <th scope="col">PRIJMENI</th>
                    <th scope="col">DATUM HOSPITALIZACE</th>
                    <th scope="col">DATUM NAROZENI</th>
                    <th scope="col">CISLO TELEFONU</th>
                    <th scope="col">POHLAVI</th>


                    <th scope="col">NAZEV_ODDELENI</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {pacientiKartyList.map((pacientKarta) => (
                    <tr key={pacientKarta.idKarta}>

                        <td>{pacientKarta.jmeno}</td>
                        <td>{pacientKarta.prijmeni}</td>
                        <td>{formatDate(new Date(pacientKarta.datumHospitalizace))}</td>
                        <td>{formatDate(new Date(pacientKarta.datumNarozeni))}</td>
                        <td>{pacientKarta.cisloTelefonu}</td>
                        <td>{pacientKarta.pohlavi}</td>
                        <td>{pacientKarta.nazevOddeleni}</td>

                        <td>

                            {updateButton(pacientKarta.idKarta)}
                            {deleteButton(pacientKarta.idKarta)}


                        </td>

                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PacientiKartyList;
