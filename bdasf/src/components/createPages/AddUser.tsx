import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { User} from "../model/security/User.tsx";
import UserService from "../services/AuthService.tsx";

// AddPacient.tsx

const AddUser: React.FC = () => {
    const navigate = useNavigate();



    const [pacient, setPacient] = useState<User>({
        idPacient: 0,
        idAdresa: 0,
        jmeno: "",
        prijmeni: "",
        datumHospitalizace: new Date(),
        datumNarozeni: new Date(),
        cisloTelefonu: 0,
        pohlavi: "",
    });

    const { id } = useParams<{ id?: string }>();
    const pacientId = parseInt(id || "0");

    const saveOrUpdatePacient = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update existing pacient
            PacientService.updatePacient(pacientId, pacient)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new pacient
            PacientService.createPacient(pacient)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            PacientService.getPacientById(pacientId)
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
                                <div className="form-group mb-2">
                                    <label>Id adresa</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="idAdresa"
                                        className="form-control"
                                        value={pacient.idAdresa}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                idAdresa: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>

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
                                        value={
                                            pacient.datumHospitalizace instanceof Date
                                                ? pacient.datumHospitalizace.toISOString().split("T")[0]
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                datumHospitalizace: new Date(e.target.value),
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
                                        value={
                                            pacient.datumNarozeni instanceof Date
                                                ? pacient.datumNarozeni.toISOString().split("T")[0]
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                datumNarozeni: new Date(e.target.value),
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
                                <div className="form-group mb-2">
                                    <label>Pohlavi</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="pohlavi"
                                        className="form-control"
                                        value={pacient.pohlavi}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                pohlavi: e.target.value,
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
                                        value={pacient.pohlavi}
                                        onChange={(e) =>
                                            setPacient((prevPacient) => ({
                                                ...prevPacient,
                                                pohlavi: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div>
                                    <Link to="/pacienti">
                                        <button type="button" className="btn btn-danger">
                                            Back
                                        </button>
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => {
                                            saveOrUpdatePacient(e);
                                        }}
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

export default AddUser;
