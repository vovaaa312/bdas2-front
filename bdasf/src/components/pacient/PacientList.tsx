// PacientList.tsx
import { Pacient } from "./Pacient";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PacientList: React.FC = () => {
  const [pacientiList, setPacientiList] = useState<Pacient[]>([]);

  useEffect(() => {
    // Функция для загрузки данных с бэкенда
    const fetchData = async () => {
      try {
        const response = await axios.get("/pacienti"); // Подставьте реальный эндпоинт бэкенда
        setPacientiList(response.data);
      } catch (error) {
        console.error("Error fetching pacienti data:", error);
      }
    };

    fetchData(); // Вызываем функцию загрузки данных при монтировании компонента
  }, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании

  return (
    <div>
      <h1>Pacient</h1>
      <table className="table">
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
              <th scope="row">{pacient.jmeno}</th>
              <td>{pacient.prijmeni}</td>
              <td>{pacient.datumHospitalizace.toDateString()}</td>
              <td>{pacient.datumNarozeni.toDateString()}</td>
              <td>{pacient.cisloTelefonu}</td>
              {/* Добавьте остальные поля пациента по необходимости */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacientList;
