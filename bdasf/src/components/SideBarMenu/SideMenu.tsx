import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";

const sideMenuStyle = {
    width: "10%",
    background: "#bce3fe",
    height: "100vh",
    float: "left",
};

const contentStyle = {
    marginLeft: "15%",
    padding: "10px",
};

const menuItemStyle = {
    padding: "10px",
    textDecoration: "none", // Убирает подчеркивание
    color: "black", // Изменяет цвет текста
};


function SideMenu() {
    const [user, setUser] = useState<StorageUserData | null>(null);

    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
        }
    }, []);


    const adminMenu = () => {
        return <div style={sideMenuStyle}>
            <ul>
                <p>
                    <Link className="btn btn-light" to="/">HomePage</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/users">Users</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/pacienti-analyzy">Analyzy pacientu</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/pacienti-karty">Karty pacientu</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/pacienti-adresy">Pacienti</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/navstevy-pacientu">Navstevy pacientu</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/zamestnanci-data">Zamestnanci</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/pokoje-data">Pokoje</Link>
                </p>

                <p>
                    <Link className="btn btn-light" to="/logs">Logs</Link>
                </p>
                <p>
                    <Link className="btn btn-light" to="/catalog">Catalog</Link>
                </p>

            </ul>
        </div>
    }
    const content = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return adminMenu();
        }
    }

    // return (
    //     <div style={sideMenuStyle}>
    //         <ul>
    //             <li>
    //                 <Link class="btn btn-light" to="/">HomePage</Link>
    //             </li>
    //             <li>
    //                 <Link class="btn btn-light" to="/login">Login</Link>
    //             </li>
    //         </ul>
    //     </div>
    // );

    return content();
}

function App() {
    return (
        <div>
            <SideMenu/>
            <div style={contentStyle}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
