// AddPacient.tsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddZamestnanec: React.FC = () => {
  const [formData, setFormData] = useState({
    idAdresa: 0,
    jmeno: "",
    prijmeni: "",
    datumNarozeni: new Date(),
    pacientCisloTelefonu: 0,
    pracZkusenosti: 0,
    pohlavi: "",
    zeme: "",
    mesto: "",
    adresa: "",
    psc: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name.startsWith("datum") ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/addZamestnanec", formData); // Replace with the actual endpoint
      // Optionally, you can redirect the user or perform any other action upon successful submission
    } catch (error) {
      console.error("Error adding zamestnanec:", error);
    }
  };

  return (
    <div>
      <h1>Add Zamestnanec</h1>
      <form onSubmit={handleSubmit}>
        {/* Jmeno */}
        <div>
          <div>
            <label>Jmeno</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="text"
              name="jmeno"
              value={formData.jmeno}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Prijmeni */}
        <div>
          <div>
            <label>Prijmeni</label>
          </div>

          <div>
            <input
              placeholder="-"
              type="text"
              name="prijmeni"
              value={formData.prijmeni}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Datum Narozeni */}
        <div>
          <div>
            <label>Datum Narozeni</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="date"
              name="datumNarozeni"
              value={formData.datumNarozeni.toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Cislo Telefonu */}
        <div>
          <div>
            <label>Cislo Telefonu</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="number"
              name="cisloTelefonu"
              value={formData.pacientCisloTelefonu}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Prac Zkusenosti */}
        <div>
          <div>
            <label>Pracovni zkusenosti</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="number"
              name="pracZkusenosti"
              value={formData.pracZkusenosti}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Zeme */}
        <div>
          <div>
            {" "}
            <label>Zeme</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="text"
              name="zeme"
              value={formData.zeme}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Mesto */}
        <div>
          <div>
            <label>Mesto:</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="text"
              name="mesto"
              value={formData.mesto}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Adresa */}
        <div>
          <div>
            <label>Adresa</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="text"
              name="adresa"
              value={formData.adresa}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PSC */}
        <div>
          <div>
            <label>PSC</label>
          </div>
          <div>
            <input
              placeholder="-"
              type="number"
              name="psc"
              value={formData.psc}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Link to="/zamestnanci">
            <button type="submit">Submit</button>
            <button type="button">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddZamestnanec;
