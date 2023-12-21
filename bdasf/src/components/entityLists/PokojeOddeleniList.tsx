// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PokojeOddeleni} from "../model/PokojeOddeleni.tsx";
import PokojeOddeleniService from "../services/PokojeOddeleniService.tsx";

import Modal from "react-modal";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import ZamestnanecService from "../services/ZamestnanecService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import PacientKataService from "../services/PacientKartaService.tsx";
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";

Modal.setAppElement("#root");
const PokojeOddeleniList: React.FC = () => {
    const [pokojeList, setPokojeList] = useState<PokojeOddeleni[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);

    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        getAllPokoje();

    }, [user]);



    const getAllPokoje = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            PokojeOddeleniService.getAllPokoje()
                .then((response) => {
                    setPokojeList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY ) {

            ZamestnanecDataService.getZamestnanecById(user.zamestnanecId)
                .then((response) => {
                    const zamestnanecData = response.data;
                    PokojeOddeleniService.getByOddeleniId(zamestnanecData.idOddeleni)
                        .then((response) => {
                            setPokojeList(response.data);


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

    const deletePokoj = (pokojId: number) => {
        const confirmDelete = window.confirm(
            "Chcete odebrat tento pokoj? Vsechna luzka v pokoje budou odebrana taky"
        );

        if (confirmDelete) {
            PokojeOddeleniService.deletePokoj(pokojId)
                .then(() => {
                    getAllPokoje();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    const pageTitle = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <h1>Pokoje</h1>
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return <h1>Pokoje</h1>
        } else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    const addPokojButton = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <div>
                <Link to="/add-pokoj">
                    <button className="btn btn-info" type="button">
                        Add pokoj
                    </button>
                </Link>
            </div>
        }

    }

    function updateButton(idPokoj: number) {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <Link
                className="btn btn-info"
                to={`/edit-pokoj/${idPokoj}`}
            >
                Update
            </Link>
        }

    }

    function deleteButton(idPokoj: number) {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <button
                className="btn btn-danger"
                onClick={() => deletePokoj(idPokoj)}
                style={{marginLeft: "10px"}}
            >
                Delete
            </button>
        }

    }

    function luzkaButton(idPokoj: number) {
        if (user?.roleName !== USER_ROLES.PACIENT &&
            user?.roleName !== USER_ROLES.UZIVATEL) {
            return <Link
                className="btn btn-success"
                to={`/luzka/${idPokoj}`}
                style={{marginLeft: "10px"}}
            >
                Luzka
            </Link>
        }

    }

    const table = () => {
        if (user?.roleName !== USER_ROLES.PACIENT &&
            user?.roleName !== USER_ROLES.UZIVATEL) {
            return <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">CISLO</th>
                    <th scope="col">PATRO</th>
                    <th scope="col">NAZEV ODDELENI</th>
                    <th scope="col">POCET LUZEK</th>
                    <th scope="col">ACTIONS</th>


                </tr>
                </thead>
                <tbody>
                {pokojeList.map((pokoj) => (
                    <tr key={pokoj.idPokoj}>

                        <td>{pokoj.cislo}</td>
                        <td>{pokoj.patro}</td>
                        <td>{pokoj.nazevOddeleni}</td>
                        <td>{pokoj.pocetLuzek}</td>

                        <td>
                            {updateButton(pokoj.idPokoj)}
                            {deleteButton(pokoj.idPokoj)}
                            {luzkaButton(pokoj.idPokoj)}


                        </td>
                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                ))}
                </tbody>
            </table>

        }
    }


    return (
        <div>
            {pageTitle()}
            {addPokojButton()}
            {table()}


        </div>
    );
};

export default PokojeOddeleniList;
