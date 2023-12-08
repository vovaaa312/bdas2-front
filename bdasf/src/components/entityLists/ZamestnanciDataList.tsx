import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ZamestnanciViewService from "../services/ZamestnanciDataService.tsx";
import {ZamestnanecData} from "../model/ZamestnanecData.tsx";

const ZamestnanciDataList: React.FC = () => {
    const [zamestnanciList, setZamestnanciList] = useState<ZamestnanecData[]>([]);

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

    const deleteZamestnanec = (zamestnanecId: number) => {
        ZamestnanciViewService.deleteZamestnanec(zamestnanecId)
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

                    <th scope="col">ID ODDELENI</th>
                    <th scope="col">NAZEV ODDELENI</th>

                    <th scope="col">ACTIONS</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {zamestnanciList.map((zamestnanecData) => (
                    <tr key={zamestnanecData.idZamestnanec}>
                        <td scope="row">{zamestnanecData.idZamestnanec}</td>
                        <td >{zamestnanecData.jmeno}</td>
                        <td>{zamestnanecData.prijmeni}</td>
                        <td>{formatDate(new Date(zamestnanecData.datumNarozeni))}</td>
                        <td>{zamestnanecData.cisloTelefonu}</td>
                        <td>{zamestnanecData.pracovniZkusenosti}</td>
                        <td>{zamestnanecData.idAdresa}</td>
                        <td>{zamestnanecData.zeme}</td>
                        <td>{zamestnanecData.mesto}</td>
                        <td>{zamestnanecData.adresa}</td>
                        <td>{zamestnanecData.psc}</td>

                        <td>{zamestnanecData.idOddeleni}</td>
                        <td>{zamestnanecData.nazevOddeleni}</td>


                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit-zamestnanec/${zamestnanecData.idZamestnanec}`}
                            >
                                Update
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={() => deleteZamestnanec(zamestnanecData.idZamestnanec)}
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

export default ZamestnanciDataList;