import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import PacientAnalyzaService from "../services/PacientAnalyzaService.tsx";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";
import Select from "react-select";
import {PacientKarta} from "../model/PacientKarta.tsx";
import PacientKartaService from "../services/PacientKartaService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";

const AddPacientAnalyza: React.FC = () => {
    const navigate = useNavigate();

    const [kartyPacientu, setKartyPacientu] = useState<PacientKarta[]>([]);

    const pacientiOptions = kartyPacientu.map(pacient => ({
        value: pacient.idKarta,
        label: `${pacient.jmeno} ${pacient.prijmeni}, ${pacient.nazevOddeleni}`
    }));

    const [user, setUser] = useState<StorageUserData | null>(null);


    const [analyza, setAnalyza] = useState<PacientAnalyza>({
        idPacient: 0,
        jmeno: "",
        prijmeni: "",
        pacientCisloTelefonu: 0,
        pohlavi: "",
        idKarta: 0,
        idOddeleni:0,
        idAnalyza: 0,
        rbc: 0,
        wbc: 0,
        hgb: 0,
        plt: 0,
        datum: new Date().toISOString().split("T")[0]
    });

    //const [pohlaviOptions] = useState<string[]>(["Muz", "Zena"]);

    const {id} = useParams<{ id?: string }>();
    const pacientId = parseInt(id || "0");



    const saveOrUpdateAnalyza = (e: React.FormEvent) => {
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
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }

        PacientKartaService.getAllPacienti()
            .then((response) => {
                setKartyPacientu(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

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



    const handlePacientSelectChange = (selectedOption) => {
        console.log("Selected Pacient:", selectedOption);
        setAnalyza((prevAnalyza) => ({
            ...prevAnalyza,
            idKarta: selectedOption ? selectedOption.value : null
        }));
        console.log("Analyza idKarta:", analyza.idKarta);
    };

    const title = () => {
        if(user?.roleName!==USER_ROLES.PACIENT&&
            user?.roleName!==USER_ROLES.UZIVATEL&&
            user){
            if (id) {
                return <h2 className="text-center">Update analyza</h2>;
            } else {
                return <h2 className="text-center">Add analyza</h2>;
            }
        }
        return <h2 className="text-center">Nedostatečná práva pro přístup k této stránce</h2>;


    };

    const content=()=>{
        if(user?.roleName!==USER_ROLES.PACIENT&&
            user?.roleName!==USER_ROLES.UZIVATEL&&
            user){
            return  <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label>Pacient</label>
                                    <Select
                                        options={pacientiOptions}
                                        onChange={handlePacientSelectChange}
                                        value={pacientiOptions.find((option) => option.value === analyza.idKarta)}

                                    />


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
                                        onClick={(e) => saveOrUpdateAnalyza(e)}
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
            {content()}

        </div>
    );
};

export default AddPacientAnalyza;