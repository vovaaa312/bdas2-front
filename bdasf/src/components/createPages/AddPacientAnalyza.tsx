import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";
const AddPacientAnalyza: React.FC = () => {
    const navigate = useNavigate();

    const [analyza, setAnalyza] = useState<PacientAnalyza>({
        idPacient: 0,
        jmeno: "",
        prijmeni: "",

        cisloTelefonu: 0,
        pohlavi: "",

        idKarta:0,
        idAnalyza:0,
        RBC:0,
        WBC:0,
        HGB:0,
        PLT:0,
        datum:new Date()

    });

    const { id } = useParams<{ id?: string }>();
    const pacientId = parseInt(id || "0");

    const saveOrUpdatePacient = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(analyza);
        if (id) {
            // Update existing analyza
            PacientAnalyzaService.updateAnalyza(pacientId, analyza)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-analyzy");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new analyza
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

                                {/* Jmeno */}
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
                                {/* Prijmeni */}
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


                                {/* Cislo Telefonu */}
                                <div className="form-group mb-2">
                                    <label>Cislo Telefonu</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="cisloTelefonu"
                                        className="form-control"
                                        value={analyza.cisloTelefonu}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                cisloTelefonu: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                {/* RBC */}
                                <div className="form-group mb-2">
                                    <label>RBC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="RBC"
                                        className="form-control"
                                        value={analyza.RBC}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                RBC: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                {/* WBC */}
                                <div className="form-group mb-2">
                                    <label>RBC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="WBC"
                                        className="form-control"
                                        value={analyza.WBC}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                WBC: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                {/* HGB */}
                                <div className="form-group mb-2">
                                    <label>RBC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="HGB"
                                        className="form-control"
                                        value={analyza.HGB}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                HGB: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                {/* PLT */}
                                <div className="form-group mb-2">
                                    <label>RBC</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="PLT"
                                        className="form-control"
                                        value={analyza.PLT}
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                PLT: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

                                {/* Datum */}
                                <div className="form-group mb-2">
                                    <label>Datum Hospitalizace</label>
                                    <input
                                        placeholder="-"
                                        type="date"
                                        name="datumHospitalizace"
                                        className="form-control"
                                        value={
                                            analyza.datum instanceof Date
                                                ? analyza.datum.toISOString().split("T")[0]
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setAnalyza((prevPacient) => ({
                                                ...prevPacient,
                                                datum: new Date(e.target.value),
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