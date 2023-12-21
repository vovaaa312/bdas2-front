// AddPacient.tsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {NavstevaPacienta} from "../model/NavstevaPacienta.tsx";
import NavstevyPacientuService from "../services/NavstevyPacientuService.tsx";
import PacientService from "../services/PacientService.tsx";
import {Pacient} from "../model/Pacient.tsx";
import Select from 'react-select';
import ZamestnanecDataService from "../services/ZamestnanecDataService.tsx";
import {ZamestnanecData} from "../model/ZamestnanecData.tsx";
import StatusNavstevyService from "../services/StatusNavstevyService.tsx";
import {StatusNavstevy} from "../model/StatusNavstevy.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";

const AddNavsteva: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id?: string }>();

    const [navsteva, setNavsteva] = useState<NavstevaPacienta>({
        idNavsteva: 0,
        // datum: new Date().toISOString().split("T")[0], // начальное значение - пустая строка
        datum: '',
        idPacient: 0,
        idZamestnanec: 0,
        problem: '', // начальное значение - пустая строка
        rekomendace: '', // начальное значение - пустая строка
        idStatus: 0,
        pacientJmeno: '',
        pacientPrijmeni: '',
        cisloTelefonu: 0,
        zamestnanecJmeno: '',
        zamestnanecPrijmeni: '',
        status: ''
    });
    const [pacienti, setPacienti] = useState<Pacient[]>([]);
    const [zamestnanci, setZamestnanci] = useState<ZamestnanecData[]>([]);
    const [statusyNavstev, setStatusyNavstev] = useState<StatusNavstevy[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);

    //const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }

        PacientService.getAllPacienti().then((response) => {
            setPacienti(response.data);
        });

        ZamestnanecDataService.getAllZamestnanci().then((response) => {
            setZamestnanci(response.data);
        });

        StatusNavstevyService.getAll().then((response) => {
            setStatusyNavstev(response.data);
        });
    }, []);

    const handlePacientChange = (selectedOption) => {
        console.log("Selected Pacient:", selectedOption);
        setNavsteva(prevNavsteva => ({
            ...prevNavsteva,
            idPacient: selectedOption ? selectedOption.value : null
        }));
    };

    const handleZamestnanecChange = (selectedOption) => {
        console.log("Selected Zamestnanec:", selectedOption);
        setNavsteva(prevNavsteva => ({
            ...prevNavsteva,
            idZamestnanec: selectedOption ? selectedOption.value : null
        }));
    };

    const handleStatusChange = (selectedOption) => {
        console.log("Selected Status:", selectedOption);
        setNavsteva(prevNavsteva => ({
            ...prevNavsteva,
            idStatus: selectedOption ? selectedOption.value : null
        }));
    };


    const pacientOptions = pacienti.map(pacient => ({
        value: pacient.idPacient,
        label: `${pacient.jmeno} ${pacient.prijmeni}`
    }));

    const zamestnanecOptions = zamestnanci.map(zamestnanec => ({
        value: zamestnanec.idZamestnanec,
        label: `${zamestnanec.jmeno} ${zamestnanec.prijmeni}`
    }));
    const statusNavstevyOptions = statusyNavstev.map(status => ({
        value: status.idStatus,
        label: status.status
    }));
    const saveNavsteva = (e: React.FormEvent) => {
        e.preventDefault();


        NavstevyPacientuService.createNavsteva(navsteva)
            .then((response) => {
                console.log(response.data);
                navigate("/navstevy-pacientu");
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(navsteva);

    };


    const title = () => {
        if (user?.roleName !== USER_ROLES.UZIVATEL &&
            user?.roleName !== USER_ROLES.PACIENT&&
            user) {
            if (id) {
                return <h2 className="text-center">Update navsteva</h2>;
            } else {
                return <h2 className="text-center">Add navsteva</h2>;
            }
        }
        return <h2 className="text-center">Nedostatečná práva pro přístup k této stránce</h2>;


    };

    function zpet() {
        navigate(-1)
    }

    const form = () => {
        if (user?.roleName !== USER_ROLES.UZIVATEL &&
            user?.roleName !== USER_ROLES.PACIENT&&
            user) {
            return  <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                {/* Pacient  */}
                                <div className="form-group mb-2">
                                    <label>Vyberte pacienta</label>
                                    <Select
                                        options={pacientOptions}
                                        onChange={handlePacientChange}
                                    />
                                </div>

                                {/* Zamestnanec */}
                                <div className="form-group mb-2">
                                    <label>Vyberte zamestnance</label>
                                    <Select
                                        options={zamestnanecOptions}
                                        onChange={handleZamestnanecChange}
                                    />
                                </div>
                                {/* Datum  */}
                                <div className="form-group mb-2">
                                    <label>Datum</label>
                                    <input
                                        placeholder="-"
                                        type="date"
                                        name="datum"
                                        className="form-control"
                                        value={navsteva.datum}
                                        onChange={(e) =>
                                            setNavsteva((prevNavsteva) => ({
                                                ...prevNavsteva,
                                                datum: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Problem */}
                                <div className="form-group mb-2">
                                    <label>Problem</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="problem"
                                        className="form-control"
                                        value={navsteva.problem}
                                        onChange={(e) =>
                                            setNavsteva((prevNavsteva) => ({
                                                ...prevNavsteva,
                                                problem: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Rekomendace */}
                                <div className="form-group mb-2">
                                    <label>Rekomendace</label>
                                    <input
                                        placeholder="-"
                                        type="text"
                                        name="rekomendace"
                                        className="form-control"
                                        value={navsteva.rekomendace}
                                        onChange={(e) =>
                                            setNavsteva((prevNavsteva) => ({
                                                ...prevNavsteva,
                                                rekomendace: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {/* Status Navstevy */}
                                <div className="form-group mb-2">
                                    <label>Vyberte status navstevy</label>
                                    <Select
                                        options={statusNavstevyOptions}
                                        onChange={handleStatusChange}
                                    />
                                </div>


                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => zpet()}
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => saveNavsteva(e)}
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

export default AddNavsteva;