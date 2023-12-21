// AddPacient.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ZamestnanciDataService from "../services/ZamestnanecDataService.tsx";
import OddeleniService from "../services/OddeleniService.tsx";
import {ZamestnanecData} from "../model/ZamestnanecData.tsx";
import {Oddeleni} from "../model/Oddeleni.tsx";
import Select from "react-select";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
const AddZamestnanecData: React.FC = () => {
    const navigate = useNavigate();
    const [oddeleni, setOddeleni] = useState<Oddeleni[]>([]);
    const [pohlaviOptions] = useState<string[]>(["Muz", "Zena"]);
    const [user, setUser] = useState<StorageUserData | null>(null);

    const oddeleniOptions = oddeleni.map(oddeleni => ({
        value: oddeleni.idOddeleni, // Убедитесь, что здесь используется правильное свойство для идентификатора
        label: `${oddeleni.nazevOddeleni}`
    }));

    const [zamestnanec, setZamestnanec] = useState<ZamestnanecData>({
        idZamestnanec: 0,
        jmeno: "",
        prijmeni: "",
        pohlavi:"",
        datumNarozeni: new Date().toISOString().split("T")[0],
        cisloTelefonu: 0,
        pracovniZkusenosti: 0,

        idAdresa: 0,
        zeme:"",
        mesto:"",
        adresa:"",
        psc:0,

        idOddeleni:0,
        nazevOddeleni:""
    });

    const { id } = useParams<{ id?: string }>();
    const pacientId = parseInt(id || "0");



    const saveOrUpdateZamestnance = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update existing zamestnanec
            ZamestnanciDataService.updateZamestnanec(pacientId, zamestnanec)
                .then((response) => {
                    console.log(response.data);
                    navigate("/zamestnanci-data");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new zamestnanec
            ZamestnanciDataService.createZamestnanec(zamestnanec)
                .then((response) => {
                    console.log(response.data);
                    navigate("/zamestnanci-data");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }

        OddeleniService.getAllOddeleni()
            .then((response) => {
                setOddeleni(response.data);
            })
            .catch((error) => {
                console.error(error);
            });


        if (id) {
            ZamestnanciDataService.getZamestnanecById(pacientId)
                .then((response) => {
                    setZamestnanec(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [id]);

    const handleOddeleniChange = (selectedOption) => {
        console.log("Selected oddeleni:", selectedOption);
        setZamestnanec(prevZamestnanec => ({
            ...prevZamestnanec,
            idOddeleni: selectedOption ? selectedOption.value : null
        }));
        console.log("Zam idOddeleni:", zamestnanec.idOddeleni);

    };
    const title = () => {
        if (user?.roleName === USER_ROLES.ADMIN ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            if (id) {
                return <h2 className="text-center">Update zamestnanec</h2>;
            } else {
                return <h2 className="text-center">Add zamestnanec</h2>;
            }
        }
        return <h2 className="text-center">Nedostatečná práva pro přístup k této stránce</h2>;


    };

    const form=()=>{
        if (user?.roleName === USER_ROLES.ADMIN ||
            user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return<div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                {/*<div className="form-group mb-2">*/}
                                {/*  <label>Id adresa</label>*/}
                                {/*  <input*/}
                                {/*    placeholder="-"*/}
                                {/*    type="number"*/}
                                {/*    name="idAdresa"*/}
                                {/*    className="form-control"*/}
                                {/*    value={zamestnanec.idAdresa}*/}
                                {/*    onChange={(e) =>*/}
                                {/*      setPacient((prevPacient) => ({*/}
                                {/*        ...prevPacient,*/}
                                {/*        idAdresa: parseInt(e.target.value, 10),*/}
                                {/*      }))*/}
                                {/*    }*/}
                                {/*  />*/}
                                {/*</div>*/}

                                {/* Jmeno */}
                                <div className="form-group mb-2">
                                    <label>Jmeno</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="jmeno"
                                        className="form-control"
                                        value={zamestnanec.jmeno}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                jmeno: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Prijmeni */}
                                <div className="form-group mb-2">
                                    <label>Prijmeni</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="prijmeni"
                                        className="form-control"
                                        value={zamestnanec.prijmeni}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                prijmeni: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Pohlavi - комбобокс */}
                                <div className="form-group mb-2">
                                    <label>Pohlavi</label>
                                    <select
                                        name="pohlavi"
                                        className="form-control"
                                        value={zamestnanec.pohlavi || ""}
                                        onChange={(e) =>
                                            setZamestnanec((prevZamestnanec) => ({
                                                ...prevZamestnanec,
                                                pohlavi: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="" disabled>Select...</option>
                                        {pohlaviOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Datum Narozeni */}
                                <div className="form-group mb-2">
                                    <label>Datum Narozeni</label>
                                    <input
                                        placeholder="-"
                                        type="date"
                                        name="datumNarozeni"
                                        className="form-control"
                                        value={zamestnanec.datumNarozeni}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                datumNarozeni: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Cislo Telefonu */}
                                <div className="form-group mb-2">
                                    <label>Cislo Telefonu</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="cisloTelefonu"
                                        className="form-control"
                                        value={zamestnanec.cisloTelefonu}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                cisloTelefonu: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                {/* Combobox для Oddeleni */}
                                <label>Vyberte oddeleni</label>
                                <Select
                                    options={oddeleniOptions}
                                    value={oddeleniOptions.find((option) => option.value === zamestnanec.idOddeleni)}
                                    onChange={handleOddeleniChange}
                                />


                                {/* Pracovni zkusenosti */}
                                <div className="form-group mb-2">
                                    <label>Pracovni zkusenosti</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="pracovniZkusenosti"
                                        className="form-control"
                                        value={zamestnanec.pracovniZkusenosti}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                pracovniZkusenosti: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                {/* Zeme */}
                                <div className="form-group mb-2">
                                    <label>Zeme</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="zeme"
                                        className="form-control"
                                        value={zamestnanec.zeme}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                zeme: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Mesto */}
                                <div className="form-group mb-2">
                                    <label>Mesto</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="mesto"
                                        className="form-control"
                                        value={zamestnanec.mesto}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                mesto: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Adresa */}
                                <div className="form-group mb-2">
                                    <label>Adresa</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="adresa"
                                        className="form-control"
                                        value={zamestnanec.adresa}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                adresa: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Psc */}
                                <div className="form-group mb-2">
                                    <label>PSC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="psc"
                                        className="form-control"
                                        value={zamestnanec.psc}
                                        onChange={(e) =>
                                            setZamestnanec((prevPacient) => ({
                                                ...prevPacient,
                                                psc: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>


                                {/*<div className="form-group mb-2">*/}
                                {/*    <label>Oddeleni</label>*/}
                                {/*    <select*/}
                                {/*        name="oddeleni"*/}
                                {/*        className="form-control"*/}
                                {/*        value={zamestnanec.nazevOddeleni || ""}*/}
                                {/*        onChange={(e) =>*/}
                                {/*            setZamestnanec((prevPacient) => ({*/}
                                {/*                ...prevPacient,*/}
                                {/*                nazevOddeleni: e.target.value,*/}
                                {/*            }))*/}
                                {/*        }*/}
                                {/*    >*/}
                                {/*        <option value="" disabled>Select Oddeleni</option>*/}
                                {/*        {oddeleniOptions.map((oddeleni) => (*/}
                                {/*            <option key={oddeleni} value={oddeleni}>*/}
                                {/*                {oddeleni}*/}
                                {/*            </option>*/}
                                {/*        ))}*/}
                                {/*    </select>*/}
                                {/*</div>*/}

                                <div>
                                    <Link to="/zamestnanci-data
                                    " className="btn btn-danger">
                                        Back
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => saveOrUpdateZamestnance(e)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
    }



    return (
        <div>
            {title()}
            {form()}

        </div>
    );
};

export default AddZamestnanecData;