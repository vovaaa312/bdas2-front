import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import PacientKataService from "../services/PacientKartaService.tsx";
import OddeleniService from "../services/OddeleniService.tsx";
import {PacientKarta} from "../model/PacientKarta.tsx";
import PacientService from "../services/PacientService.tsx";
import {Pacient} from "../model/Pacient.tsx";
import Select from "react-select";
import {Oddeleni} from "../model/Oddeleni.tsx";

const AddPacientKarta: React.FC = () => {
    const navigate = useNavigate();

    const [pacienti, setPacienti] = useState<Pacient[]>([]);
    const [oddeleni, setOddeleni] = useState<Oddeleni[]>([]);

    const oddeleniOptions = oddeleni.map(oddeleni => ({
        value: oddeleni.idOddeleni, // Убедитесь, что здесь используется правильное свойство для идентификатора
        label: `${oddeleni.nazevOddeleni}`
    }));

    const pacientiOptions = pacienti.map(pacient => ({
        value: pacient.idPacient, // Убедитесь, что здесь используется правильное свойство для идентификатора
        label: `${pacient.jmeno} ${pacient.prijmeni}`
    }));

    const [karta, setKarta] = useState<PacientKarta>({
        idPacient: null,
        jmeno: "",
        prijmeni: "",
        datumHospitalizace: new Date().toISOString().split("T")[0],
        datumNarozeni: new Date().toISOString().split("T")[0],
        cisloTelefonu: 0,
        pohlavi: "",

        idKarta: 0,
        idOddeleni: 0,
        nazevOddeleni: ""
    });

    //const [oddeleniOptions, setOddeleniOptions] = useState<string[]>([]);

    const {id} = useParams<{ id?: string }>();
    const kartaId = parseInt(id || "0");

    const saveOrUpdateKarta = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (id) {
                // Update existing pacient
                const response = await PacientKataService.updateKarta(kartaId, karta);
                console.log(response.data);
                navigate("/pacienti-karty");
            } else {
                // Create new pacient
                const kartaPacienta = {
                    idPacient: karta.idPacient,
                    jmeno: karta.jmeno,
                    prijmeni: karta.prijmeni,
                    datumHospitalizace: karta.datumHospitalizace,
                    datumNarozeni: karta.datumNarozeni,
                    cisloTelefonu: karta.cisloTelefonu,
                    pohlavi: karta.pohlavi,
                    idKarta: karta.idKarta,
                    idOddeleni: karta.idOddeleni,
                    nazevOddeleni: karta.nazevOddeleni
                };
                const response = await PacientKataService.createPacient(kartaPacienta);
                console.log(response.data);
                navigate("/pacienti-karty");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        PacientService.getAllPacienti()
            .then((response) => {
                setPacienti(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        OddeleniService.getAllOddeleni()
            .then((response) => {
                setOddeleni(response.data);
            })
            .catch((error) => {
                console.error(error);
            });


        if (id) {
            PacientKataService.getByKartaId(kartaId)
                .then((response) => {
                    setKarta(response.data);

                    // setPacienti(response.data.idPacient);
                    // setOddeleni(response.data.idOddeleni);
                })
                .catch((error) => {
                    console.log(error);
                });
        }


    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update karta</h2>;
        } else {
            return <h2 className="text-center">Add karta</h2>;
        }
    };

    const handlePacientChange = (selectedOption) => {
        console.log("Selected Pacient:", selectedOption);
        setKarta(prevKarta => ({
            ...prevKarta,
            idPacient: selectedOption ? selectedOption.value : null
        }));
        console.log("Karta idPacient:", karta.idPacient);

    };

    const handleOddeleniChange = (selectedOption) => {
        console.log("Selected oddeleni:", selectedOption);
        setKarta(prevKarta => ({
            ...prevKarta,
            idOddeleni: selectedOption ? selectedOption.value : null
        }));
        console.log("Karta idOddeleni:", karta.idOddeleni);

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
                                    <label>Vyberte pacienta</label>
                                    <Select
                                        options={pacientiOptions}
                                        value={pacientiOptions.find((option) => option.value === karta.idPacient)}
                                        onChange={handlePacientChange}
                                    />

                                </div>

                                {/* Combobox для Oddeleni */}
                                <div className="form-group mb-2">

                                    <label>Vyberte oddeleni</label>
                                    <Select
                                        options={oddeleniOptions}
                                        value={oddeleniOptions.find((option) => option.value === karta.idOddeleni)}
                                        onChange={handleOddeleniChange}
                                    />

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