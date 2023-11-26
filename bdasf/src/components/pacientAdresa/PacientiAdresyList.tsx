// PacientList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PacientAdresaService from "../services/PacientAdresaService.tsx";
import {PacientAdresa} from "./PacientAdresa.tsx";

const PacientiAdresyList: React.FC = () => {
    const [pacientiAdresyList, setPacientiAdresyList] = useState<PacientAdresa[]>([]);

    useEffect(() => {
        getAllPacients();
    }, []);

    const getAllPacients = () => {
        PacientAdresaService.getAllPacienti()
            .then((response) => {
                setPacientiAdresyList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deletePacient = (pacientId: number) => {
        PacientAdresaService.deletePacient(pacientId)
            .then(() => {
                getAllPacients();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const formatDate = (date: Date) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };
    return (
        <div>
            <h1>Pacienti</h1>
            <div>
                <Link to="/addPacient">
                    <button className="btn btn-info" type="button">
                        Add pacient
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID</th>

                    <th scope="col">JMENO</th>
                    <th scope="col">PRIJMENI</th>
                    <th scope="col">DATUM HOSPITALIZACE</th>
                    <th scope="col">DATUM NAROZENI</th>
                    <th scope="col">CISLO TELEFONU</th>
                    <th scope="col">POHLAVI</th>
                    <th scope="col">ZEME</th>
                    <th scope="col">MESTO</th>
                    <th scope="col">ADRESA</th>
                    <th scope="col">PSC</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {pacientiAdresyList.map((pacientAdresa) => (
                    <tr key={pacientAdresa.idPacient}>
                        <td>{pacientAdresa.idPacient}</td>

                        <td scope="row">{pacientAdresa.jmeno}</td>
                        <td>{pacientAdresa.prijmeni}</td>
                        {/*<td>{pacient.datumHospitalizace.toString()}</td>*/}
                        {/*<td>{pacient.datumNarozeni.toString()}</td>*/}
                        <td>{formatDate(new Date(pacientAdresa.datumHospitalizace))}</td>
                        <td>{formatDate(new Date(pacientAdresa.datumNarozeni))}</td>
                        <td>{pacientAdresa.cisloTelefonu}</td>
                        <td>{pacientAdresa.zeme}</td>
                        <td>{pacientAdresa.mesto}</td>
                        <td>{pacientAdresa.adresa}</td>
                        <td>{pacientAdresa.psc}</td>

                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit/${pacientAdresa.idPacient}`}
                            >
                                Update
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => deletePacient(pacientAdresa.idPacient)}
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

export default PacientiAdresyList;
