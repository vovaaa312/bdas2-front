import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PacientKataService from "../services/PacientKataService.tsx";
import OddeleniService from "../services/OddeleniService.tsx";
import {PacientKarta} from "../model/PacientKarta.tsx";

const AddPacientKarta: React.FC = () => {
    const navigate = useNavigate();

    const [karta, setKarta] = useState<PacientKarta>({
        idPacient: 0,
        jmeno: "",
        prijmeni: "",
        datumHospitalizace: new Date(),
        datumNarozeni: new Date(),
        cisloTelefonu: 0,
        pohlavi: "",

        idKarta:0,
        idOddeleni:0,
        nazevOddeleni:""

    });
    const [pohlaviOptions] = useState<string[]>(["Muz", "Zena"]); // Добавлен массив с возможными значениями
    const [oddeleniOptions, setOddeleniOptions] = useState<string[]>([]);

    const { id } = useParams<{ id?: string }>();
    const kartaId = parseInt(id || "0");

    const saveOrUpdateKarta = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update existing pacient


            PacientKataService.updateKarta(kartaId, karta)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-karty");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new pacient
            PacientKataService.createPacient(karta)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pacienti-karty");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            PacientKataService.getByKartaId(kartaId)
                .then((response) => {
                    setKarta(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        OddeleniService.getAllOddeleni()
            .then((response) => {
                setOddeleniOptions(response.data.map((oddeleni) => oddeleni.nazevOddeleni));
            })
            .catch((error) => {
                console.error("Error loading oddeleni options", error);
            });
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update karta</h2>;
        } else {
            return <h2 className="text-center">Add karta</h2>;
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
                                        disabled={!!id}
                                        placeholder="-"
                                        type="text"
                                        name="jmeno"
                                        className="form-control"
                                        value={karta.jmeno}
                                        onChange={(e) =>
                                            setKarta((prevPacient) => ({
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
                                        disabled={!!id}
                                        placeholder="-"
                                        type="text"
                                        name="prijmeni"
                                        className="form-control"
                                        value={karta.prijmeni}
                                        onChange={(e) =>
                                            setKarta((prevPacient) => ({
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
                                        disabled={!!id}
                                        placeholder="-"
                                        type="number"
                                        name="cisloTelefonu"
                                        className="form-control"
                                        value={karta.cisloTelefonu}
                                        onChange={(e) =>
                                            setKarta((prevPacient) => ({
                                                ...prevPacient,
                                                cisloTelefonu: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>


                                {/* Combobox для Oddeleni */}
                                <div className="form-group mb-2">
                                    <label>Oddeleni</label>
                                    <select
                                        name="oddeleni"
                                        className="form-control"
                                        value={karta.nazevOddeleni || ""}
                                        onChange={(e) =>
                                            setKarta((prevPacient) => ({
                                                ...prevPacient,
                                                nazevOddeleni: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="" disabled>Select Oddeleni</option>
                                        {oddeleniOptions.map((oddeleni) => (
                                            <option key={oddeleni} value={oddeleni}>
                                                {oddeleni}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div>
                                    <Link to="/pacienti-karty" className="btn btn-danger">
                                        Back
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => saveOrUpdateKarta(e)}
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

export default AddPacientKarta;