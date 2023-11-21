// PacientList.tsx
import { Pacient } from "./Pacient";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacientService from "../services/PacientService";

const PacientList: React.FC = () => {
  const [pacientiList, setPacientiList] = useState<Pacient[]>([]);

  useEffect(() => {
    getAllPacients();
  }, []);

  const getAllPacients = () => {
    PacientService.getAllPacienti()
      .then((response) => {
        setPacientiList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePacient = (pacientId: number) => {
    PacientService.deletePacient(pacientId)
      .then(() => {
        getAllPacients();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Pacient</h1>
      <div>
        <Link to="/addPacient">
          <button className="btn btn-info" type="button">
            Add pacient
          </button>
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">JMENO</th>
            <th scope="col">PRIJMENI</th>
            <th scope="col">DATUM HOSPITALIZACE</th>
            <th scope="col">DATUM NAROZENI</th>
            <th scope="col">CISLO TELEFONU</th>
            {/* Добавьте остальные поля пациента по необходимости */}
          </tr>
        </thead>
        <tbody>
          {pacientiList.map((pacient) => (
            <tr key={pacient.id}>
              <td scope="row">{pacient.jmeno}</td>
              <td>{pacient.prijmeni}</td>
              <td>{pacient.datumHospitalizace.toString()}</td>
              <td>{pacient.datumNarozeni.toString()}</td>
              <td>{pacient.cisloTelefonu}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-employee/${pacient.id}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePacient(pacient.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
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

export default PacientList;
