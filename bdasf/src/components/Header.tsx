import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {StorageUserData} from "./model/response/StorageUserData.tsx";
import LocalStorageService from "./services/LocalStorageService.tsx";
import {USER_ROLES} from "./model/USER_ROLES.tsx";

const mainContentStyle = {
    paddingBottom: '35px'
};

const linkStyle = {
    textDecoration: 'none', // Убираем подчеркивание
    margin: '10px', // Отступ между элементами
    color: 'white', // Цвет текста
};


const Header: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<StorageUserData | null>(null);
    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
        }
    }, []);
    const logout = () => {
        if (user) {
            localStorage.clear();
        }
        navigate("/login");
        window.location.reload();
    };


    const logoutSpan = () => {
        return <span style={linkStyle} onClick={logout}>Logout</span>
    }

    const loginSpan = () => {
        return <span style={linkStyle} onClick={logout}>Login</span>
    }

    const editUser = () => {
        navigate(`/edit-user/${localStorage.getItem('userId')}`);
    };

    const editUserSpan = () => {
        return <span style={linkStyle} onClick={editUser}>Edit user</span>

    }
    const adminMenu = () => {
        return (
            <div>
                <Link style={linkStyle} to="/">HomePage</Link>
                <Link style={linkStyle} to="/users">Users</Link>
                <Link style={linkStyle} to="/pacienti-analyzy">Analyzy pacientu</Link>
                <Link style={linkStyle} to="/pacienti-karty">Karty pacientu</Link>
                <Link style={linkStyle} to="/pacienti-adresy">Pacienti</Link>
                <Link style={linkStyle} to="/navstevy-pacientu">Navstevy pacientu</Link>
                <Link style={linkStyle} to="/zamestnanci-data">Zamestnanci</Link>
                <Link style={linkStyle} to="/pokoje-data">Pokoje</Link>
                <Link style={linkStyle} to="/logs">Logs</Link>
                <Link style={linkStyle} to="/catalog">Catalog</Link>
                {editUserSpan()}
                {logoutSpan()}
                {/*<span style={linkStyle} onClick={logout}>Logout</span>*/}

            </div>
        );
    };

    const unauthMenu = () => {
        return (
            <div>
                <Link style={linkStyle} to="/">HomePage</Link>
                {loginSpan()}

            </div>
        );
    }

    const editZam = () => {
        navigate(`/edit-zamestnanec/${localStorage.getItem('zamId')}`);
    };

    const editZamSpan = () => {
        return <span style={linkStyle} onClick={editZam}>Edit zamestnanec</span>

    }
    const zamNadrMenu = () => {
        return (
            <div>
                <Link style={linkStyle} to="/">HomePage</Link>
                <Link style={linkStyle} to="/pacienti-analyzy">Analyzy pacientu</Link>
                <Link style={linkStyle} to="/pacienti-karty">Karty pacientu</Link>
                <Link style={linkStyle} to="/pacienti-adresy">Pacienti</Link>
                <Link style={linkStyle} to="/navstevy-pacientu">Navstevy pacientu</Link>
                <Link style={linkStyle} to="/zamestnanci-data">Zamestnanci</Link>
                <Link style={linkStyle} to="/pokoje-data">Pokoje</Link>
                {editZamSpan()}
                {editUserSpan()}
                {logoutSpan()}

            </div>
        );
    }

    const pacMenu = () => {
        return (
            <div>
                <Link style={linkStyle} to="/">HomePage</Link>
                <Link style={linkStyle} to="/pacienti-analyzy">Analyzy pacientu</Link>
                <Link style={linkStyle} to="/navstevy-pacientu">Navstevy pacientu</Link>
                {editUserSpan()}
                {logoutSpan()}

            </div>
        );
    }
    const zamMenu = () => {
        return (
            <div>
                <Link style={linkStyle} to="/">HomePage</Link>
                <Link style={linkStyle} to="/pacienti-analyzy">Analyzy pacientu</Link>
                <Link style={linkStyle} to="/pacienti-karty">Karty pacientu</Link>
                <Link style={linkStyle} to="/pacienti-adresy">Pacienti</Link>
                <Link style={linkStyle} to="/navstevy-pacientu">Navstevy pacientu</Link>
                <Link style={linkStyle} to="/pokoje-data">Pokoje</Link>
                {editZamSpan()}
                {editUserSpan()}

                {logoutSpan()}
                {/*<span style={linkStyle} onClick={logout}>Logout</span>*/}

            </div>
        );
    }

    const uzivatelMenu = () => {
        return (
            <div>
                <Link style={linkStyle} to="/">HomePage</Link>
                {editUserSpan()}
                {loginSpan()}

            </div>
        );
    }

    const itemMenu = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return adminMenu();
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC) {
            return zamMenu();
        } else if (user?.roleName === USER_ROLES.ZAMESTNANEC_NADRIZENY) {
            return zamNadrMenu();
        } else if (user?.roleName === USER_ROLES.PACIENT) {
            return pacMenu();
        } else if (user?.roleName === USER_ROLES.UZIVATEL) {
            return uzivatelMenu();
        } else {
            return unauthMenu();
        }
    }

    return (
        <div style={mainContentStyle}>
            <header style={{position: 'fixed', top: 0, width: '100%', zIndex: 1000}}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        {itemMenu()}
                    </div>
                </nav>
            </header>
        </div>
    );
};
export default Header;


