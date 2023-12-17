// PacientList.tsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import PacientService from "../services/PacientService.tsx";
import {Pacient} from "../model/Pacient.tsx";
import {RezervaceLuzkaRequest} from "../model/request/RezervaceLuzkaRequest.tsx";
import PacientLuzkoService from "../services/PacientLuzkoService.tsx";
import Select from "react-select";

const PacientiRezervaceList: React.FC = () => {
    const navigate = useNavigate();
    const [pacientiList, setPacientiList] = useState<Pacient[]>([]);

    const pacientiOptions = pacientiList.map(pacient => ({
        value: pacient.idPacient, // Убедитесь, что здесь используется правильное свойство для идентификатора
        label: `${pacient.jmeno} ${pacient.prijmeni}`
    }));

    const handlePacientSelectChange = (selectedOption) => {
        // Обновление состояния запроса на резервацию с новым id пациента
        setRequest(prevRequest => ({
            ...prevRequest,
            pacientId: selectedOption ? selectedOption.value : null
        }));
    };

    const [request, setRequest] = useState<RezervaceLuzkaRequest>({
        luzkoId: 0,
        pacientId: 0,
        datumRezervace: null,
        datumPropusteni:null
    });

    const {id} = useParams<{ id?: string }>();
    const luzkoId = parseInt(id || "0");

    useEffect(() => {
        getAllPacients();
    }, []);

    const getAllPacients = () => {
        PacientService.getAllPacienti()
            .then((response) => {
                setPacientiList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const confirmRezervace = () => {
        // Создание запроса на резервацию с использованием данных из состояния
        const rezervaceRequest: RezervaceLuzkaRequest = {
            luzkoId: luzkoId, // luzkoId получаем из URL или другого источника
            pacientId: request.pacientId, // Используем pacientId из состояния request
            datumRezervace: request.datumRezervace,
            datumPropusteni: request.datumPropusteni
        };

        // Отправка запроса
        PacientLuzkoService.rezervaceLuzka(rezervaceRequest)
            .then((rezervaceResponse) => {
                console.log('Reservation successful:', rezervaceResponse.data);
                navigate(-1); // Возвращаемся назад после успешной резервации
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };




    const today = new Date().toISOString().split("T")[0];

    function zpet() {
        navigate(-1);

    }

    return (
        <div>
            <h2 className={"offset-md-0"}>Rezervace luzka</h2>

            <div className="card col-md-6 offset-md-0 offset-md-0">
                <label>Vyberte datum rezervace</label>

                <div className="form-group mb-2">
                    <input
                        placeholder="-"
                        type="date"
                        name="datumRezervace"
                        className="form-control"
                        value={request.datumRezervace || ''} // Используйте || '' для корректного отображения null
                        min={today} // Устанавливаем минимальную дату
                        onChange={(e) =>
                            setRequest((prevRequest) => ({
                                ...prevRequest,
                                datumRezervace: e.target.value,
                            }))
                        }
                    />
                </div>

                <label>Vyberte datum propusteni</label>
                <div className="form-group mb-2">
                    <input
                        placeholder="-"
                        type="date"
                        name="datumPropusteni"
                        className="form-control"
                        value={request.datumPropusteni || ''} // Используйте || '' для корректного отображения null
                        min={today} // Устанавливаем минимальную дату
                        onChange={(e) =>
                            setRequest((prevRequest) => ({
                                ...prevRequest,
                                datumPropusteni: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    {/*<h3>Vyberte pacienta</h3>*/}

                    {/*<button*/}
                    {/*    className="btn btn-info"*/}
                    {/*    onClick={() => zpet()}*/}
                    {/*>*/}
                    {/*    Zpet*/}
                    {/*</button>*/}

                    {/* Pacient  */}
                    <label>Vyberte pacienta</label>
                    <div className="form-group mb-2">
                        <Select
                            options={pacientiOptions}
                            onChange={handlePacientSelectChange}
                        />
                        <button
                            className="btn btn-success"
                            onClick={confirmRezervace}
                        >
                            Rezervovat
                        </button>


                        <button
                            className="btn btn-danger"
                            onClick={() => zpet()}
                        >
                            Zpet
                        </button>

                    </div>
                </div>

            </div>


            {/*<table className="table table-bordered">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th scope="col">JMENO</th>*/}
            {/*        <th scope="col">PRIJMENI</th>*/}
            {/*        <th scope="col">POHLAVI</th>*/}
            {/*        <th scope="col">ACTIONS</th>*/}


            {/*        /!* Добавьте остальные поля пациента по необходимости *!/*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {pacientiList.map((pacient) => (*/}
            {/*        <tr key={pacient.idPacient}>*/}

            {/*            <td>{pacient.jmeno}</td>*/}
            {/*            <td>{pacient.prijmeni}</td>*/}
            {/*            <td>{pacient.pohlavi}</td>*/}

            {/*            <td>*/}
            {/*                <button*/}
            {/*                    className="btn btn-success"*/}
            {/*                    onClick={() => confirmRezervace(pacient.idPacient)}*/}
            {/*                    style={{marginLeft: "10px"}}*/}
            {/*                >*/}
            {/*                    Pridat*/}
            {/*                </button>*/}
            {/*            </td>*/}
            {/*            /!* Добавьте остальные поля пациента по необходимости *!/*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    );
};

export default PacientiRezervaceList;
