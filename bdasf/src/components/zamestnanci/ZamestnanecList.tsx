// PacientList.tsx
import { Zamestnanec } from "./Zamestnanec";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ZamestnanecList: React.FC = () => {
  const [pacientiList, setZamestnanciList] = useState<Zamestnanec[]>([]);

  useEffect(() => {
    // Функция для загрузки данных с бэкенда
    const fetchData = async () => {
      try {
        const response = await axios.get("/zamestnanci"); // Подставьте реальный эндпоинт бэкенда
        setZamestnanciList(response.data);
      } catch (error) {
        console.error("Error fetching zamestnanci data:", error);
      }
    };

    fetchData(); // Вызываем функцию загрузки данных при монтировании компонента
  }, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании

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
            <th scope="col">JMENO</th>
            <th scope="col">PRIJMENI</th>
            <th scope="col">DATUM NAROZENI</th>
            <th scope="col">CISLO TELEFONU</th>
            <th scope="col">PRACOVNI ZKUSENOSTI</th>

            {/* Добавьте остальные поля пациента по необходимости */}
          </tr>
        </thead>
        <tbody>
          {pacientiList.map((pacient) => (
            <tr key={pacient.id}>
              <th scope="row">{pacient.jmeno}</th>
              <td>{pacient.prijmeni}</td>
              <td>{pacient.datumNarozeni.toDateString()}</td>
              <td>{pacient.cisloTelefonu}</td>
              <td>{pacient.pracZkusenosti}</td>

              {/* Добавьте остальные поля пациента по необходимости */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ZamestnanecList;
