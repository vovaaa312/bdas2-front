import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ZamestnanciViewService from "../services/ZamestnanecDataService.tsx";
import {ZamestnanecData} from "../model/ZamestnanecData.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";

const ZamestnanciDataList: React.FC = () => {
    const [zamestnanciList, setZamestnanciList] = useState<ZamestnanecData[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);
    const [zamestnanec, setZamestnanec] = useState<Zamestnanec>();

    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);

    useEffect(() => {
        // if (user) {
        //     console.log(user)
        //     if (user.zamestnanecId) {
        //         ZamestnanecService.getZamestnanecById(user.zamestnanecId)
        //             .then((response) => {
        //                 setZamestnanec(response.data);
        //                 console.log(response.data);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        //
        //     }
        // }
        getAllZamestnanci();

    }, [user]);


    const getAllZamestnanci = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            ZamestnanciViewService.getAllZamestnanci()
                .then((response) => {
                    setZamestnanciList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            ZamestnanecDataService.getZamestnanecById(user.zamestnanecId)
                .then((response) => {
                    const zamestnanecData = response.data;
                    ZamestnanciViewService.getAllByOddeleni(zamestnanecData.idOddeleni)
                        .then((response) => {
                            setZamestnanciList(response.data);
                            console.log(response.data);
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
        if (user?.roleName === USER_ROLES.ADMIN ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return <h1>Zamestnanci</h1>
        } else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }
    const addZamButton = () => {
        if (user?.roleName === USER_ROLES.ADMIN ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return <div>
                <Link to="/add-zamestnanec">
                    <button className="btn btn-info" type="button">
                        Add zamestnance
                    </button>
                </Link>
            </div>
        }

    }
    const table = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return adminTable();
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return zamTable();
        }


    }

    const adminTable=()=>{
        return  <table className="table table-bordered">
            <thead>
            <tr>

                <th scope="col">JMENO</th>
                <th scope="col">PRIJMENI</th>
                <th scope="col">DATUM NAROZENI</th>
                <th scope="col">CISLO TELEFONU</th>
                <th scope="col">PRACOVNI ZKUSENOSTI</th>
                <th scope="col">POHLAVI</th>

                <th scope="col">ZEME</th>
                <th scope="col">MESTO</th>
                <th scope="col">ADRESA</th>
                <th scope="col">PSC</th>

                <th scope="col">NAZEV ODDELENI</th>

                <th scope="col">ACTIONS</th>


            </tr>
            </thead>
            <tbody>
            {zamestnanciList.map((zamestnanecData) => (
                <tr key={zamestnanecData.idZamestnanec}>
                    <td scope="row">{zamestnanecData.idZamestnanec}</td>
                    <td>{zamestnanecData.jmeno}</td>
                    <td>{zamestnanecData.prijmeni}</td>
                    <td>{formatDate(new Date(zamestnanecData.datumNarozeni))}</td>
                    <td>{zamestnanecData.cisloTelefonu}</td>
                    <td>{zamestnanecData.pracovniZkusenosti}</td>
                    <td>{zamestnanecData.pohlavi}</td>


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
                            style={{marginLeft: "10px"}}
                        >
                            Delete
                        </button>
                    </td>

                </tr>
            ))}
            </tbody>
        </table>

    }

    const zamTable=()=>{
        return <table className="table table-bordered">
            <thead>
            <tr>

                <th scope="col">JMENO</th>
                <th scope="col">PRIJMENI</th>
                <th scope="col">DATUM NAROZENI</th>
                <th scope="col">CISLO TELEFONU</th>
                <th scope="col">PRACOVNI ZKUSENOSTI</th>
                <th scope="col">POHLAVI</th>

                <th scope="col">ZEME</th>
                <th scope="col">MESTO</th>
                <th scope="col">ADRESA</th>
                <th scope="col">PSC</th>

                <th scope="col">NAZEV ODDELENI</th>



                {/* Добавьте остальные поля пациента по необходимости */}
            </tr>
            </thead>
            <tbody>
            {zamestnanciList.map((zamestnanecData) => (
                <tr key={zamestnanecData.idZamestnanec}>
                    <td>{zamestnanecData.jmeno}</td>
                    <td>{zamestnanecData.prijmeni}</td>
                    <td>{formatDate(new Date(zamestnanecData.datumNarozeni))}</td>
                    <td>{zamestnanecData.cisloTelefonu}</td>
                    <td>{zamestnanecData.pracovniZkusenosti}</td>
                    <td>{zamestnanecData.pohlavi}</td>


                    <td>{zamestnanecData.zeme}</td>
                    <td>{zamestnanecData.mesto}</td>
                    <td>{zamestnanecData.adresa}</td>
                    <td>{zamestnanecData.psc}</td>

                    <td>{zamestnanecData.nazevOddeleni}</td>



                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
            ))}
            </tbody>
        </table>

    }

    return (
        <div>
            {pageTitle()}
            {addZamButton()}
            {table()}
        </div>
    );
};

export default ZamestnanciDataList;