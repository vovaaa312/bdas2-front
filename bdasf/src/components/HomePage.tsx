import React from "react";

const HomePage = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Vítejte v naší nemocnici</h1>
            <p className="lead text-center">
                Staráme se o vaše zdraví a pohodu.
            </p>
            <div className="row">
                <div className="col-md-6">
                    <h2>O nás</h2>
                    <p>
                        Naše nemocnice poskytuje vysoce kvalitní lékařské služby
                        pomocí moderního vybavení a vysoce kvalifikovaných
                        personál.
                    </p>
                </div>
                <div className="col-md-6">
                    <h2>Naše služby</h2>
                    <ul>
                        <li>Rezervace lůžka pacienta</li>
                        <li>Provádění analýz</li>
                        <li>Objednávání schůzek pro pacienty a zaměstnanci</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
