import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PacientAdresaService from "../services/PacientAdresaService.tsx";
import { PacientAdresa } from "../model/PacientAdresa.tsx";

const AddPacientAdresa: React.FC = () => {
    const navigate = useNavigate();

    const [pacient, setPacient] = useState<PacientAdresa>({
        idPacient: 0,
        jmeno: "",
        prijmeni: "",
        datumHospitalizace: new Date().toISOString().split("T")[0], // Исправлено для поля Date
        datumNarozeni: new Date().toISOString().split("T")[0], // Исправлено для поля Date
        cisloTelefonu: 0,
        pohlavi: "",

        idAdresa: 0,
        zeme: "",
        mesto: "",
        adresa: "",
        psc: 0,
    });
    const [pohlaviOptions] = useState<string[]>(["Muz", "Zena"]);

    const { id } = useParams<{ id?: string }>();
    const pacientId = parseInt(id || "0");

    const saveOrUpdatePacient = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update existing pacient
            PacientAdresaService.updatePacient(pacientId, pacient)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-adresy");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new pacient
            PacientAdresaService.createPacient(pacient)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-adresy");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            PacientAdresaService.getPacientById(pacientId)
                .then((response) => {
                    setPacient(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update pacient</h2>;
        } else {
            return <h2 className="text-center">Add pacient</h2>;
        }
    };

    return (
        <div>
            {title()}

            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                {/* Jmeno */}
                                <div className="form-group mb-2">
                                    <label>Jmeno</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="jmeno"
                                        className="form-control"
                                        value={pacient.jmeno}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
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
                                        value={pacient.prijmeni}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                prijmeni: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Datum Hospitalizace */}
                                <div className="form-group mb-2">
                                    <label>Datum Hospitalizace</label>
                                    <input
                                        placeholder="-"
                                        type="date"
                                        name="datumHospitalizace"
                                        className="form-control"
                                        value={pacient.datumHospitalizace}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                datumHospitalizace: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Datum Narozeni */}
                                <div className="form-group mb-2">
                                    <label>Datum Narozeni</label>
                                    <input
                                        placeholder="-"
                                        type="date"
                                        name="datumNarozeni"
                                        className="form-control"
                                        value={pacient.datumNarozeni}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
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
                                        value={pacient.cisloTelefonu}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                cisloTelefonu: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                {/* Pohlavi */}
                                {/* Pohlavi - комбобокс */}
                                <div className="form-group mb-2">
                                    <label>Pohlavi</label>
                                    <select
                                        name="pohlavi"
                                        className="form-control"
                                        value={pacient.pohlavi || ""}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                pohlavi: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="" disabled>Select Pohlavi</option>
                                        {pohlaviOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Zeme */}
                                <div className="form-group mb-2">
                                    <label>Zeme</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="zeme"
                                        className="form-control"
                                        value={pacient.zeme}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
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
                                        value={pacient.mesto}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
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
                                        value={pacient.adresa}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
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
                                        value={pacient.psc}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                psc: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                <div>
                                    <Link to="/pacienti-adresy" className="btn btn-danger">
                                        Back
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => saveOrUpdatePacient(e)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPacientAdresa;


