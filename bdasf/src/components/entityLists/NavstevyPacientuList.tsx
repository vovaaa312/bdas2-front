// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NavstevaPacienta} from "../model/NavstevaPacienta.tsx";
import NavstevyPacientuService from "../services/NavstevyPacientuService.tsx";

const NavstevyPacientuList: React.FC = () => {
    const [navstevyList, setNavstevyList] = useState<NavstevaPacienta[]>([]);

    useEffect(() => {
        getAllNavstevy();
    }, []);

    const getAllNavstevy = () => {
        NavstevyPacientuService.getAllNavstevy()
            .then((response) => {
                setNavstevyList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    // const deleteAnalyza = (analyzaId: number) => {
    //     NavstevyPacientuService.ge(analyzaId)
    //         .then(() => {
    //             getAllNavstevy();
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };
    return (
        <div>
            <h1>Navstevy pacientu</h1>
            <div>
                <Link to="/add-navsteva">
                    <button className="btn btn-info" type="button">
                        Add navsteva
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">DATUM</th>
                    <th scope="col">PROBLEM</th>
                    <th scope="col">REKOMENDACE</th>
                    <th scope="col">JMENO PACIENTA</th>
                    <th scope="col">PRIJMENI PACIENTA</th>
                    <th scope="col">KONTAKT NA PACIENTA</th>
                    <th scope="col">JMENO ZAMESTNANCE</th>
                    <th scope="col">PRIJMENI ZAMESTNANCE</th>
                    <th scope="col">STATUS</th>



                    {/* Добавьте остальные поля пациента по необходимости */}
                </tr>
                </thead>
                <tbody>
                {navstevyList.map((navsteva) => (
                    <tr key={navsteva.idNavsteva}>
                        <td>{formatDate(new Date(navsteva.datum))}</td>
                        <td>{navsteva.problem}</td>
                        <td>{navsteva.rekomendace}</td>
                        <td>{navsteva.pacientJmeno}</td>
                        <td>{navsteva.pacientPrijmeni}</td>
                        <td>{navsteva.cisloTelefonu}</td>
                        <td>{navsteva.zamestnanecJmeno}</td>
                        <td>{navsteva.zamestnanecPrijmeni}</td>
                        <td>{navsteva.status}</td>


                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/edit-navsteva/${navsteva.idNavsteva}`}
                            >
                                Update
                            </Link>

                            {/*<button*/}
                            {/*    className="btn btn-danger"*/}
                            {/*    onClick={() => deleteAnalyza(navsteva.idAnalyza)}*/}
                            {/*    style={{marginLeft: "10px"}}*/}
                            {/*>*/}
                            {/*    Delete*/}
                            {/*</button>*/}
                        </td>

                        {/* Добавьте остальные поля пациента по необходимости */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default NavstevyPacientuList;
