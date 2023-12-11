// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";

const PacientiAnalyzyList: React.FC = () => {
    const [pacientiAnalyzyList, setPacientiAnalyzyList] = useState<PacientAnalyza[]>([]);

    useEffect(() => {
        getAllAnalyzy();
    }, []);

    const getAllAnalyzy = () => {
        PacientAnalyzaService.getAllAnalyzy()
            .then((response) => {
                setPacientiAnalyzyList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
        const options = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"};
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };
    return (
        <div>
            <h1>Analyzy pacientu</h1>
            <div>
                <Link to="/add-pacient-karta">
                    <button className="btn btn-info" type="button">
                        Add analyza
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID_PACIENT</th>

                    <th scope="col">JMENO</th>
                    <th scope="col">PRIJMENI</th>
                    <th scope="col">CISLO TELEFONU</th>
                    <th scope="col">POHLAVI</th>

                    <th scope="col">ID_KARTA</th>
                    <th scope="col">ID_ANALYZA</th>
                    <th scope="col">RBC</th>
                    <th scope="col">WBC</th>
                    <th scope="col">HGB</th>
                    <th scope="col">PLT</th>

                    <th scope="col">DATUM</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {pacientiAnalyzyList.map((pacientKarta) => (
                    <tr key={pacientKarta.idAnalyza}>
                        <td>{pacientKarta.idPacient}</td>

                        <td>{pacientKarta.jmeno}</td>
                        <td>{pacientKarta.prijmeni}</td>
                        <td>{pacientKarta.cisloTelefonu}</td>
                        <td>{pacientKarta.pohlavi}</td>
                        <td>{pacientKarta.idKarta}</td>
                        <td>{pacientKarta.idAnalyza}</td>
                        <td>{pacientKarta.RBC}</td>
                        <td>{pacientKarta.WBC}</td>
                        <td>{pacientKarta.HGB}</td>
                        <td>{pacientKarta.PLT}</td>
                        <td>{formatDate(new Date(pacientKarta.datum))}</td>


                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit-pacient-analyza/${pacientKarta.idAnalyza}`}
                            >
                                Update
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={() => deleteAnalyza(pacientKarta.idAnalyza)}
                                style={{marginLeft: "10px"}}
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

export default PacientiAnalyzyList;
