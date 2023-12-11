import React from "react";

const mainContentStyle = {
    paddingTop: '50px'
};
const Footer: React.FC = () => {
    return (
        <div style={mainContentStyle}>
            <footer className="footer" style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000 }}>
                <span className="text">st64550, st64150</span>
            </footer>
        </div>
    );
};

export default Footer;

