// AddPacient.tsx
import React, {  useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {PacientLuzko} from "../model/PacientLuzko.tsx";
import PacientLuzkoService from "../services/PacientLuzkoService.tsx";

const AddLuzko: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id?: string }>();
    const pokojId = parseInt(id || "0");

    const [luzko, setLuzko] = useState<PacientLuzko>({
        idLuzko:        null,
        idPokoj:        pokojId,
        idPacient:      null,
        jmeno:          null,
        prijmeni:       null,
        datumRezervace: null,
        datumPropusteni:null,
        status:         false,
        cislo:          0,
        patro:          0,
        nazevOddeleni:  null
    });




    const saveOrUpdateLuzko = (e: React.FormEvent) => {
        e.preventDefault();


            PacientLuzkoService.createLuzko(luzko)
                .then((response) => {
                    console.log(response.data);
                    navigate(-1);
                })
                .catch((error) => {
                    console.log(error);
                });

            console.log(luzko);

    };


    const title = () => {
        if (id) {
            return <h2 className="text-center">Update luzko</h2>;
        } else {
            return <h2 className="text-center">Add luzko</h2>;
        }
    };

    function zpet() {
        navigate(-1)
    }

    return (
        <div>
            {title()}

            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                {/* Cislo */}
                                <div className="form-group mb-2">
                                    <label>Cislo</label>
                                    <input
                                        placeholder="-"
                                        type="number"
                                        name="cislo"
                                        className="form-control"
                                        value={luzko.cislo}
                                        onChange={(e) =>
                                            setLuzko((prevLuzko) => ({
                                                ...prevLuzko,
                                                cislo: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </div>


                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={()=>zpet()}
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => saveOrUpdateLuzko(e)}
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

export default AddLuzko;