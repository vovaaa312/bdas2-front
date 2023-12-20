// PacientList.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NavstevaPacienta} from "../model/NavstevaPacienta.tsx";
import NavstevyPacientuService from "../services/NavstevyPacientuService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {Zamestnanec} from "../model/Zamestnanec.tsx";
import ZamestnanecService from "../services/ZamestnanecService.tsx";

const NavstevyPacientuList: React.FC = () => {
    const [navstevyList, setNavstevyList] = useState<NavstevaPacienta[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);
    const[zamestnanec,setZamestnanec ] = useState<Zamestnanec>();

    // Загрузка User при монтировании компонента
    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);// Пустой массив зависимостей, чтобы выполнять только один раз при монтировании

    useEffect(() => {
        // Этот код будет выполняться каждый раз, когда user обновится
        if (user) {
            console.log(user);
            if(user.zamestnanecId){
                getZamestnanec(user.zamestnanecId);

            }
            getAllNavstevy();
        }
    }, [user]); // Указываем user как зависимость
    const getZamestnanec = (zamId:number) => {
        ZamestnanecService.getZamestnanecById(zamId)
            .then((response) => {
                setZamestnanec(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllNavstevy = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {

            NavstevyPacientuService.getAllNavstevy()
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user?.roleName === USER_ROLES.PACIENT) {
            console.log(user.pacientId);
            NavstevyPacientuService.getByPacientId(user.pacientId)
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }else if(user?.roleName === USER_ROLES.ZAMESTNANEC){
            NavstevyPacientuService.getByZamestnanecId(user.zamestnanecId)
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }else if(user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY && zamestnanec?.idOddeleni){
            NavstevyPacientuService.getByOddeleniId(zamestnanec?.idOddeleni)
                .then((response) => {
                    setNavstevyList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        }


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

    // const formatDate = (date: Date) => {
    //     const options: Intl.DateTimeFormatOptions = {
    //         year: "numeric",
    //         month: "2-digit",
    //         day: "2-digit",
    //         hour: "2-digit",
    //         minute: "2-digit",
    //     };
    //     return new Intl.DateTimeFormat("en-US", options).format(date);
    // };

    const pageTitle = () => {
        if (user?.roleName === USER_ROLES.UZIVATEL) {
            return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

        } else return <h1>Navstevy pacientu</h1>

    }
    return (
        <div>
            {pageTitle()}
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
                        {/*<td>{formatDate(new Date(navsteva.datum))}</td>*/}
                        <td>{navsteva.datum}</td>

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
