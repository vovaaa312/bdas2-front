// PacientList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {PacientKarta} from "../model/PacientKarta.tsx";
import PacientKataService from "../services/PacientKartaService.tsx";

const PacientiKartyList: React.FC = () => {
    const [pacientiKartyList, setPacientiKartyList] = useState<PacientKarta[]>([]);

    useEffect(() => {
        getAllKarty();
    }, []);

    const getAllKarty = () => {
        PacientKataService.getAllPacienti()
            .then((response) => {
                setPacientiKartyList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
    return (
        <div>
            <h1>Karty pacientu</h1>
            <div>
                <Link to="/add-pacient-karta">
                    <button className="btn btn-info" type="button">
                        Add karta
                    </button>
                </Link>
            </div>

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

                        <td >{pacientKarta.jmeno}</td>
                        <td>{pacientKarta.prijmeni}</td>
                        <td>{formatDate(new Date(pacientKarta.datumHospitalizace))}</td>
                        <td>{formatDate(new Date(pacientKarta.datumNarozeni))}</td>
                        <td>{pacientKarta.cisloTelefonu}</td>
                        <td>{pacientKarta.pohlavi}</td>
                        <td>{pacientKarta.nazevOddeleni}</td>

                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit-pacient-karta/${pacientKarta.idKarta}`}
                            >
                                Update
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={() => deletePacient(pacientKarta.idKarta)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
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
