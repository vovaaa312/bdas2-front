// PacientList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {PokojeOddeleni} from "../model/PokojeOddeleni.tsx";
import PokojeOddeleniService from "../services/PokojeOddeleniService.tsx";

import Modal from "react-modal";
Modal.setAppElement("#root");
const PokojeOddeleniList: React.FC = () => {
    const [pokojeList, setPokojeList] = useState<PokojeOddeleni[]>([]);

    useEffect(() => {
        getAllPokoje();
    }, []);

    const getAllPokoje = () => {
        PokojeOddeleniService.getAllPokoje()
            .then((response) => {
                setPokojeList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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




    return (
        <div>
            <h1>Pokoje</h1>
            <div>
                <Link to="/add-pokoj">
                    <button className="btn btn-info" type="button">
                        Add pokoj
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">CISLO</th>
                    <th scope="col">PATRO</th>
                    <th scope="col">NAZEV ODDELENI</th>
                    <th scope="col">POCET LUZEK</th>
                    <th scope="col">ACTIONS</th>



                    {/* Добавьте остальные поля пациента по необходимости */}
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
                            <Link
                                className="btn btn-info"
                                to={`/edit-pokoj/${pokoj.idPokoj}`}
                            >
                                Update
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => deletePokoj(pokoj.idPokoj)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>

                            <Link
                                className="btn btn-success"
                                to={`/luzka/${pokoj.idPokoj}`}
                                style={{ marginLeft: "10px" }}
                            >
                                Luzka
                            </Link>
                        </td>
                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    );
};

export default PokojeOddeleniList;
