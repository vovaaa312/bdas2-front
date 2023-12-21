import React from "react";

const mainContentStyle = {
    paddingBottom: '0px'
};
const Header: React.FC = () => {
    return (
        <div style={mainContentStyle}>
            <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a className="navbar-brand">Clinic Management Application</a>
                    </div>
                </nav>
            </header>
        </div>
    );
};
export default Header;
