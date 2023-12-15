import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";
import { PacientAnalyza } from "../model/PacientAnalyza.tsx";
const AddPacientAnalyza: React.FC = () => {
    const navigate = useNavigate();

    const [analyza, setAnalyza] = useState<PacientAnalyza>({
        idPacient: 0,
        jmeno: "",
        prijmeni: "",
        cisloTelefonu: 0,
        pohlavi: "",
        idKarta: 0,
        idAnalyza: 0,
        rbc: 0,
        wbc: 0,
        hgb: 0,
        plt: 0,
        datum: new Date().toISOString().split("T")[0]
    });

    const [pohlaviOptions] = useState<string[]>(["Muz", "Zena"]);

    const { id } = useParams<{ id?: string }>();
    const pacientId = parseInt(id || "0");

    const saveOrUpdatePacient = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(analyza);
        if (id) {
            PacientAnalyzaService.updateAnalyza(pacientId, analyza)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-analyzy");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            PacientAnalyzaService.createAnalyza(analyza)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-analyzy");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            PacientAnalyzaService.getByAnalyzaId(pacientId)
                .then((response) => {
                    setAnalyza(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update analyza</h2>;
        } else {
            return <h2 className="text-center">Add analyza</h2>;
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
                                <div className="form-group mb-2">
                                    <label>Jmeno</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="jmeno"
                                        className="form-control"
                                        value={analyza.jmeno}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                jmeno: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Prijmeni</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="prijmeni"
                                        className="form-control"
                                        value={analyza.prijmeni}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                prijmeni: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Pohlavi</label>
                                    <select
                                        name="pohlavi"
                                        className="form-control"
                                        value={analyza.pohlavi || ""}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
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
                                <div className="form-group mb-2">
                                    <label>RBC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="RBC"
                                        className="form-control"
                                        value={analyza.rbc}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                rbc: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>WBC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="WBC"
                                        className="form-control"
                                        value={analyza.wbc}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                wbc: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>HGB</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="HGB"
                                        className="form-control"
                                        value={analyza.hgb}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                hgb: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>PLT</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="PLT"
                                        className="form-control"
                                        value={analyza.plt}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                plt: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Datum provedeni</label>
                                    <input
                                        placeholder="-"
                                        type="date"
                                        name="datum"
                                        className="form-control"
                                        value={analyza.datum}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                datum: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <Link to="/pacienti-analyzy" className="btn btn-danger">
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

export default AddPacientAnalyza;