// AddPacient.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OddeleniService from "../services/OddeleniService.tsx";
import PokojeOddeleniService from "../services/PokojeOddeleniService.tsx";
import {PokojeOddeleni} from "../model/PokojeOddeleni.tsx";

const AddPokoj: React.FC = () => {
    const navigate = useNavigate();

    const [pokoj, setPokoj] = useState<PokojeOddeleni>({
        idPokoj: 0,
        patro:0,
        cislo:0,
        idOddeleni:0,
        nazevOddeleni:"",
        pocetLuzek:0
    });

    const { id } = useParams<{ id?: string }>();
    const pokojId = parseInt(id || "0");

    const [oddeleniOptions, setOddeleniOptions] = useState<string[]>([]);


    const saveOrUpdateZamestnance = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update existing pokoj
            PokojeOddeleniService.updatePokoj(pokojId, pokoj)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pokoje-data");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Create new pokoj
            PokojeOddeleniService.createPokoj(pokoj)
                .then((response) => {
                    console.log(response.data);
                    navigate("/pokoje-data");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            PokojeOddeleniService.getPokojById(pokojId)
                .then((response) => {
                    setPokoj(response.data);
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
                console.error("Error loading pokoje options", error);
            });
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update pokoj</h2>;
        } else {
            return <h2 className="text-center">Add pokoj</h2>;
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
                                {/*<div className="form-group mb-2">*/}
                                {/*  <label>Id adresa</label>*/}
                                {/*  <input*/}
                                {/*    placeholder="-"*/}
                                {/*    type="number"*/}
                                {/*    name="idAdresa"*/}
                                {/*    className="form-control"*/}
                                {/*    value={pokoj.idAdresa}*/}
                                {/*    onChange={(e) =>*/}
                                {/*      setPacient((prevPacient) => ({*/}
                                {/*        ...prevPacient,*/}
                                {/*        idAdresa: parseInt(e.target.value, 10),*/}
                                {/*      }))*/}
                                {/*    }*/}
                                {/*  />*/}
                                {/*</div>*/}


                                {/* Patro */}
                                <div className="form-group mb-2">
                                    <label>Patro</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="patro"
                                        className="form-control"
                                        value={pokoj.patro}
                                        onChange={(e) =>
                                            setPokoj((prevPacient) => ({
                                                ...prevPacient,
                                                patro: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>
                                {/* Cislo */}
                                <div className="form-group mb-2">
                                    <label>Cislo</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="pracovniZkusenosti"
                                        className="form-control"
                                        value={pokoj.cislo}
                                        onChange={(e) =>
                                            setPokoj((prevPacient) => ({
                                                ...prevPacient,
                                                cislo: parseInt(e.target.value, 10),
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
                                        value={pokoj.nazevOddeleni || ""}
                                        onChange={(e) =>
                                            setPokoj((prevPacient) => ({
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
                                    <Link to="/pokoje-data
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
        </div>
    );
};

export default AddPokoj;