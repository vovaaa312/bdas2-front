import React from 'react';

const ChooseUserRolePage: React.FC = () => {
    return (
        <div >
            <h1>Choose Your Role</h1>
            <button className="btn btn-success" onClick={() => console.log('Pacient selected')}>Pacient</button>
            <button className="btn btn-info" onClick={() => console.log('Zamestnanec selected')}>Zamestnanec</button>
        </div>
    );
};

export default ChooseUserRolePage;
