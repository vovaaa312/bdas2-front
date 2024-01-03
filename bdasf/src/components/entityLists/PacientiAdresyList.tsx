// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PacientViewService from "../services/PacientAdresaService.tsx";
import {PacientAdresa} from "../model/PacientAdresa.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import ZamestnanecService from "../services/ZamestnanecService.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";
import PacientAdresaService from "../services/PacientAdresaService.tsx";
import {PrumVekRequest} from "../model/request/PrumVekRequest.tsx";

const PacientiAdresyList: React.FC = () => {
    const [pacientiAdresyList, setPacientiAdresyList] = useState<PacientAdresa[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);
    const [zamestnanec, setZamestnanec] = useState<Zamestnanec>();
    const [prumVekRequest, setPrumVekRequest] = useState<PrumVekRequest>({
        datumOd: null,
        datumDo: null,
        pohlavi: "",
    });
    const [averageAge, setAverageAge] = useState<number | null>(null);
    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);

    useEffect(() => {
        if (user) {
            if (user.zamestnanecId) {
                getZamestnanec(user.zamestnanecId);

            }
        }
        getAllPacients();
    }, [user]);

    useEffect(() => {
        if (prumVekRequest.datumOd && prumVekRequest.datumDo && prumVekRequest.pohlavi) {
            PacientAdresaService.vypocitatPrumernyVekPacientu(prumVekRequest)
                .then((response) => {
                    console.log('Average age response:', response.data); // Добавьте это для отладки

                    setAverageAge(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [prumVekRequest]);


    const getZamestnanec = (zamId: number) => {
        ZamestnanecService.getZamestnanecById(zamId)
            .then((response) => {
                setZamestnanec(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllPacients = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            PacientViewService.getAllPacienti()
                .then((response) => {
                    setPacientiAdresyList(response.data);
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
                    PacientViewService.getAllByOddeleni(zamestnanecData.idOddeleni)
                        .then((response) => {
                            setPacientiAdresyList(response.data);

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

    const deletePacient = (pacientId: number) => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            window.alert("Nedostatečná práva pro operace");
        }

        PacientViewService.deletePacient(pacientId)
            .then(() => {
                getAllPacients();
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
            return <h1>Pacienti</h1>

        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return <h1>Pacienti</h1>

        } else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    const adminUserTable = () => {
        const filteredPacienti = pacientiAdresyList.filter((pacient) => {
            const birthDate = new Date(pacient.datumNarozeni);
            const isDateInRange = (!prumVekRequest.datumOd || !prumVekRequest.datumDo) ? true : (
                birthDate >= new Date(prumVekRequest.datumOd) && birthDate <= new Date(prumVekRequest.datumDo)
            );
            const isGenderMatch = prumVekRequest.pohlavi === "" || pacient.pohlavi === prumVekRequest.pohlavi;

            return isDateInRange && isGenderMatch;
        });

        return <table className="table table-bordered">
            <thead>
            <tr>
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
                <th scope="col">ACTIONS</th>


                {/* Добавьте остальные поля пациента по необходимости */}
            </tr>
            </thead>
            <tbody>
            {filteredPacienti.map((pacientAdresa) => (
                <tr key={pacientAdresa.idPacient}>
                    <td>{pacientAdresa.jmeno}</td>
                    <td>{pacientAdresa.prijmeni}</td>
                    <td>{formatDate(new Date(pacientAdresa.datumHospitalizace))}</td>
                    <td>{formatDate(new Date(pacientAdresa.datumNarozeni))}</td>
                    <td>{pacientAdresa.pacientCisloTelefonu}</td>
                    <td>{pacientAdresa.pohlavi}</td>
                    <td>{pacientAdresa.zeme}</td>
                    <td>{pacientAdresa.mesto}</td>
                    <td>{pacientAdresa.adresa}</td>
                    <td>{pacientAdresa.psc}</td>

                    <td>
                        <Link
                            className="btn btn-info"
                            to={`/edit-pacient-adresa/${pacientAdresa.idPacient}`}
                        >
                            Update
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={() => deletePacient(pacientAdresa.idPacient)}
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
    }

    const zamPacientTable = () => {
        const filteredPacienti = pacientiAdresyList.filter((pacient) => {
            const birthDate = new Date(pacient.datumNarozeni);
            const isDateInRange = (!prumVekRequest.datumOd || !prumVekRequest.datumDo) ? true : (
                birthDate >= new Date(prumVekRequest.datumOd) && birthDate <= new Date(prumVekRequest.datumDo)
            );
            const isGenderMatch = prumVekRequest.pohlavi === "" || pacient.pohlavi === prumVekRequest.pohlavi;

            return isDateInRange && isGenderMatch;
        });

        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">JMENO</th>
                    <th scope="col">PRIJMENI</th>
                    <th scope="col">DATUM HOSPITALIZACE</th>
                    <th scope="col">DATUM NAROZENI</th>
                    <th scope="col">CISLO TELEFONU</th>
                    <th scope="col">POHLAVI</th>
                </tr>
                </thead>
                <tbody>
                {filteredPacienti.map((pacientAdresa) => (
                    <tr key={pacientAdresa.idPacient}>
                        <td>{pacientAdresa.jmeno}</td>
                        <td>{pacientAdresa.prijmeni}</td>
                        <td>{formatDate(new Date(pacientAdresa.datumHospitalizace))}</td>
                        <td>{formatDate(new Date(pacientAdresa.datumNarozeni))}</td>
                        <td>{pacientAdresa.pacientCisloTelefonu}</td>
                        <td>{pacientAdresa.pohlavi}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
    const table = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return adminUserTable();
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return zamPacientTable();
        }


    }

    const addPacientButton = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <div>
                <Link to="/add-pacient-adresa">
                    <button className="btn btn-info" type="button">
                        Add pacient
                    </button>
                </Link>
            </div>
        }
    }


    const handleDatumOdChange = (event) => {
        const newDatumOd = new Date(event.target.value);
        setPrumVekRequest((prevRequest) => {
            const updatedRequest = {...prevRequest, datumOd: newDatumOd};

            // if (newDatumOd > new Date(prevRequest.datumDo)) {
            //     updatedRequest.datumDo = newDatumOd;
            // }

            return updatedRequest;
        });
    };

    const handleDatumDoChange = (event) => {
        const newDatumDo = new Date(event.target.value);
        setPrumVekRequest((prevRequest) => {
            const updatedRequest = {...prevRequest, datumDo: newDatumDo};

            // if (newDatumDo < new Date(prevRequest.datumOd)) {
            //     updatedRequest.datumOd = newDatumDo;
            // }

            return updatedRequest;
        });
    };


    const handlePohlaviChange = (event) => {
        const newPohlavi = event.target.value;

        setPrumVekRequest((prevRequest) => {
            return {...prevRequest, pohlavi: newPohlavi};
        });
    };


    const prumVekSelect = () => {

        // const handleDatumOdChange = (event) => {
        //     const newDatumOd = new Date(event.target.value);
        //     setPrumVekRequest((prevRequest) => {
        //         const updatedRequest = {
        //             ...prevRequest,
        //             datumOd: newDatumOd,
        //         };
        //
        //         if (newDatumOd > new Date(prevRequest.datumDo)) {
        //             updatedRequest.datumDo = newDatumOd;
        //         }
        //
        //         return updatedRequest;
        //     });
        // };
        //
        // const handleDatumDoChange = (event) => {
        //     setPrumVekRequest({
        //         ...prumVekRequest,
        //         datumDo: event.target.value,
        //     });
        //
        //     if (new Date(event.target.value) < new Date(prumVekRequest.datumOd)) {
        //         setPrumVekRequest({
        //             ...prumVekRequest,
        //             datumOd: event.target.value,
        //         });
        //     }
        //
        //     if (prumVekRequest.datumOd && prumVekRequest.datumDo && prumVekRequest.pohlavi) {
        //         PacientAdresaService.vypocitatPrumernyVekPacientu(prumVekRequest)
        //             .then((response) => {
        //                 setAverageAge(response.data);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        //     }
        // };
        //
        // const handlePohlaviChange = (event) => {
        //     setPohlavi(event.target.value);
        //
        //     if (datumOd && datumDo && event.target.value) {
        //         PacientAdresaService.vypocitatPrumernyVekPacientu(prumVekRequest)
        //             .then((response) => {
        //                 // Установите средний возраст в состоянии
        //                 setAverageAge(response.data);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        //     }
        // };
        //

        return (
            <div className="card col-md-0 offset-md-0 offset-md-0">
                <div className="card-body">
                    <div>
                        <label>Datum od:</label>
                        <input
                            className="form-control"
                            type="date"
                            value={prumVekRequest.datumOd ? prumVekRequest.datumOd.toISOString().substring(0, 10) : ""}
                            onChange={handleDatumOdChange}
                        />
                    </div>
                    <div>
                        <label>Datum do:</label>
                        <input
                            className="form-control"
                            type="date"
                            value={prumVekRequest.datumDo ? prumVekRequest.datumDo.toISOString().substring(0, 10) : ""}
                            onChange={handleDatumDoChange}/>
                    </div>
                    <div>
                        <label>Pohlavi:</label>
                        <select
                            className="form-control"
                            value={prumVekRequest.pohlavi}
                            onChange={handlePohlaviChange}>
                            <option value="">Vyberte pohlavi</option>
                            <option value="Muz">Muz</option>
                            <option value="Zena">Zena</option>
                        </select>
                    </div>
                    <div>
                        <label>Průměrný věk pacientů:{averageAge}</label>

                    </div>
                </div>
            </div>

        );

    }

    return (
        <div>
            {pageTitle()}
            {prumVekSelect()}
            {addPacientButton()}
            {table()}

        </div>
    );
};

export default PacientiAdresyList;
