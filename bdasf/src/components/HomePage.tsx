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
                {/*<div className="col-md-6">*/}
                {/*    <h2>Наши услуги</h2>*/}
                {/*    <ul>*/}
                {/*        <li>Общая медицинская практика</li>*/}
                {/*        <li>Хирургические операции</li>*/}
                {/*        <li>Лабораторные исследования</li>*/}
                {/*        <li>Имеющиеся у нас услуги</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default HomePage;
