// PacientList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PacientService from "../services/PacientService.tsx";
import { Pacient } from "../entity/Pacient.tsx";

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

  const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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
            <th scope="col">ID</th>
            <th scope="col">ID ADRESA</th>

            <th scope="col">JMENO</th>
            <th scope="col">PRIJMENI</th>
            <th scope="col">DATUM HOSPITALIZACE</th>
            <th scope="col">DATUM NAROZENI</th>
            <th scope="col">CISLO TELEFONU</th>
            <th scope="col">POHLAVI</th>

            {/* Добавьте остальные поля пациента по необходимости */}
          </tr>
        </thead>
        <tbody>
          {pacientiList.map((pacient) => (
            <tr key={pacient.idPacient}>
              <td>{pacient.idAdresa}</td>

              <td scope="row">{pacient.jmeno}</td>
              <td>{pacient.prijmeni}</td>
              {/*<td>{pacient.datumHospitalizace.toString()}</td>*/}
              {/*<td>{pacient.datumNarozeni.toString()}</td>*/}
              <td>{formatDate(new Date(pacient.datumHospitalizace))}</td>
              <td>{formatDate(new Date(pacient.datumNarozeni))}</td>
              <td>{pacient.cisloTelefonu}</td>
              <td>{pacient.pohlavi}</td>

              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-pacient/${pacient.idPacient}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePacient(pacient.idPacient)}
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
