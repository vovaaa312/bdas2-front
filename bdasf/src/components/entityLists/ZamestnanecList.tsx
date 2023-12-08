// PacientList.tsx
import { Zamestnanec } from "../model/Zamestnanec.tsx";
import React, { useEffect, useState } from "react";
import ZamestnanecService from "../services/ZamestnanecService.tsx";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ZamestnanecList: React.FC = () => {
  const [zamestnanciList, setZamestnanciList] = useState<Zamestnanec[]>([]);

  useEffect(() => {
    getAllZamestnanci();
  }, []);

  const getAllZamestnanci = () => {
    ZamestnanecService.getAllZamestnanci()
        .then((response) => {
          setZamestnanciList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const deleteZamestnanec = (zamestnanecId: number) => {
    ZamestnanecService.deleteZamestnanec(zamestnanecId)
        .then(() => {
          getAllZamestnanci();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const formatDate = (date: Date) => {
    const options = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"};
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div>
      <h1>Zamestnanci</h1>
      <div>
        <Link to="/addZamestnance">
          <button type="button">Add zamestnance</button>
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ID ADRESA</th>
            <th scope="col">JMENO</th>
            <th scope="col">PRIJMENI</th>
            <th scope="col">DATUM NAROZENI</th>
            <th scope="col">CISLO TELEFONU</th>
            <th scope="col">PRACOVNI ZKUSENOSTI</th>
            <th scope="col">ID ODDELENI</th>


            {/* Добавьте остальные поля пациента по необходимости */}
          </tr>
        </thead>
        <tbody>
          {zamestnanciList.map((zamestnanec) => (
            <tr key={zamestnanec.idZamestnanec}>
              <td>{zamestnanec.idZamestnanec}</td>
              <td>{zamestnanec.idAdresa}</td>
              <td>{zamestnanec.jmeno}</td>
              <td>{zamestnanec.prijmeni}</td>
              <td>{formatDate(new Date(zamestnanec.datumNarozeni))}</td>
              <td>{zamestnanec.cisloTelefonu}</td>
              <td>{zamestnanec.pracZkusenosti}</td>
              <td>{zamestnanec.idOddeleni}</td>
              <td>
                <Link
                    className="btn btn-info"
                    to={`/edit-pacient/${zamestnanec.idZamestnanec}`}
                >
                  Update
                </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteZamestnanec(zamestnanec.idZamestnanec)}
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

export default ZamestnanecList;
