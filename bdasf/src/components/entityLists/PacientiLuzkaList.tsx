import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PacientLuzko} from "../model/PacientLuzko.tsx";
import PacientLuzkoService from "../services/PacientLuzkoService.tsx";

const PacientiLuzkaList: React.FC = () => {
    const navigate = useNavigate();
    const [pacientiLuzkaList, setPacientiLuzkaList] = useState<PacientLuzko[]>([]);
    const {id} = useParams<{ id?: string }>();
    const luzkoId = parseInt(id || "0");
   // const [luzko, setLuzko] = useState<PacientLuzko>();


    useEffect(() => {
        getAllLuzka();

    }, []);

    const getAllLuzka = () => {
        if (id) {
            PacientLuzkoService.getByPokojId(luzkoId)
                .then((response) => {
                    setPacientiLuzkaList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };

    const deleteLuzko = (luzkoId: number) => {
        PacientLuzkoService.getByLuzkoId(luzkoId)
            .then((response) => {
                const retrievedLuzko = response.data;
                console.log(retrievedLuzko);

                if (retrievedLuzko && retrievedLuzko.idPacient == 0) {
                    const confirmDelete = window.confirm(
                        "Chcete odebrat toto luzko?"
                    );
                    if (confirmDelete) {
                        PacientLuzkoService.deleteLuzko(luzkoId)
                            .then(() => {
                                getAllLuzka();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                } else {
                    window.alert("Toto luzko je obsazene!");
                }
            })
            .catch((error) => {
                console.log(error);
            });



    };

    const releaseLuzko = (luzkoId: number) => {
        const confirmRelease = window.confirm(
            "Chcete uvolnit toto luzko?"
        );
        if (confirmRelease) {
            PacientLuzkoService.releaseLuzko(luzkoId)
                .then(() => {
                    getAllLuzka();
                })
                .catch((error) => {
                    console.log(error);
                });}

    };

    const formatDate = (date: string | null) => {
        if (date) {
            // Преобразовываем строку в объект Date
            const dateObject = new Date(date);

            if (!isNaN(dateObject.getTime())) {
                // Если преобразование прошло успешно, форматируем дату
                const options: Intl.DateTimeFormatOptions = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                };
                return new Intl.DateTimeFormat("en-US", options).format(dateObject);
            } else {
                // Если преобразование не удалось, возвращаем пустую строку
                return "";
            }
        } else {
            return ""; // Возвращает пустую строку, если date равно null
        }
    };


    const rezervaceLuzka = (luzkoId: number) => {
        PacientLuzkoService.getByLuzkoId(luzkoId)
            .then((response) => {
                const retrievedLuzko = response.data;
                console.log(retrievedLuzko);

                if (retrievedLuzko && retrievedLuzko.idPacient == 0) {
                    // Теперь навигация будет выполняться только если luzko.idPacient равно null
                    navigate(`rezervace-luzka/${luzkoId}`);
                } else {
                    window.alert("Toto luzko je obsazene!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div>
            <h1>Luzka</h1>
            <div>
                <Link
                    className="btn btn-info"
                    to={`/add-luzko/${id}`}
                >
                  Add luzko
                </Link>
            </div>

            <div>
                <Link to="/pokoje-data">
                    <button className="btn btn-link" type="button">
                       Zpet
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">CISLO</th>
                    <th scope="col">PATRO</th>
                    <th scope="col">NAZEV ODDELENI</th>
                    <th scope="col">DATUM REZERVACE</th>
                    <th scope="col">DATUM PROPUSTENI</th>
                    <th scope="col">JMENO</th>

                    <th scope="col">PRIJMENI</th>
                    <th scope="col">ACTIONS</th>


                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {pacientiLuzkaList.map((pacientLuzko) => (
                    <tr key={pacientLuzko.idLuzko}>
                        <td>{pacientLuzko.cislo}</td>
                        <td>{pacientLuzko.patro}</td>
                        <td>{pacientLuzko.nazevOddeleni}</td>

                        <td>{formatDate(pacientLuzko.datumRezervace) || ""}</td>
                        <td>{formatDate(pacientLuzko.datumPropusteni) || ""}</td>

                        <td>{pacientLuzko.jmeno}</td>
                        <td>{pacientLuzko.prijmeni}</td>

                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteLuzko(pacientLuzko.idLuzko)}
                                style={{marginLeft: "10px"}}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={() => releaseLuzko(pacientLuzko.idLuzko)}
                                style={{marginLeft: "10px"}}
                            >
                                Uvolnit luzko
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => rezervaceLuzka(pacientLuzko.idLuzko)}
                                style={{marginLeft: "10px"}}
                            >
                                Rezervace
                            </button>
                        </td>

                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PacientiLuzkaList;