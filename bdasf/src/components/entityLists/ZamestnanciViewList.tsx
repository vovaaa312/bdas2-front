
// PacientList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ZamestnanciViewService from "../services/ZamestnanciViewService.tsx";
import {ZamestnanecAdresa} from "../model/ZamestnanecAdresa.tsx";

const ZamestnanciViewList: React.FC = () => {
    const [zamestnanciList, setZamestnanciList] = useState<ZamestnanecAdresa[]>([]);

    useEffect(() => {
        getAllZamestnanci();
    }, []);

    const getAllZamestnanci = () => {
        ZamestnanciViewService.getAllZamestnanci()
            .then((response) => {
                setZamestnanciList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deletePacient = (pacientId: number) => {
        ZamestnanciViewService.deleteZamestnanec(pacientId)
            .then(() => {
                getAllZamestnanci();
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
            <h1>Zamestnanci</h1>
            <div>
                <Link to="/addZamestnanec">
                    <button className="btn btn-info" type="button">
                        Add zamestnance
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID</th>

                    <th scope="col">JMENO</th>
                    <th scope="col">PRIJMENI</th>
                    <th scope="col">DATUM NAROZENI</th>
                    <th scope="col">CISLO TELEFONU</th>
                    <th scope="col">PRACOVNI ZKUSENOSTI</th>

                    <th scope="col">ID ADRESA</th>
                    <th scope="col">ZEME</th>
                    <th scope="col">MESTO</th>
                    <th scope="col">ADRESA</th>
                    <th scope="col">PSC</th>

                    <th scope="col">ACTIONS</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {zamestnanciList.map((zamestnanecView) => (
                    <tr key={zamestnanecView.idZamestnanec}>
                        <td scope="row">{zamestnanecView.idZamestnanec}</td>
                        <td >{zamestnanecView.jmeno}</td>
                        <td>{zamestnanecView.prijmeni}</td>
                        <td>{formatDate(new Date(zamestnanecView.datumNarozeni))}</td>
                        <td>{zamestnanecView.cisloTelefonu}</td>
                        <td>{zamestnanecView.pracovniZkusenosti}</td>
                        <td>{zamestnanecView.idAdresa}</td>
                        <td>{zamestnanecView.zeme}</td>
                        <td>{zamestnanecView.mesto}</td>
                        <td>{zamestnanecView.adresa}</td>
                        <td>{zamestnanecView.psc}</td>



                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit-zamestnanec/${zamestnanecView.idZamestnanec}`}
                            >
                                Update
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={() => deletePacient(zamestnanecView.idZamestnanec)}
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

export default ZamestnanciViewList;
