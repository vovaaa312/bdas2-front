// AddPacient.tsx
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PacientService from "../services/PacientService";
import { Pacient } from "./Pacient";

const AddPacient: React.FC = () => {
  const navigate = useNavigate();

  const [idAdresa, setIdAdresa] = useState<number>(0); // Пример для числа
  const [jmeno, setJmeno] = useState<string>("");
  const [prijmeni, setPrijmeni] = useState<string>("");
  const [datumHospitalizace, setDatumHospitalizace] = useState<Date | null>(
    null
  ); // Пример для даты
  const [datumNarozeni, setDatumNarozeni] = useState<Date | null>(null); // Пример для даты
  const [cisloTelefonu, setCisloTelefonu] = useState<number>(0);
  const [pohlavi, setPohlavi] = useState<string>("");
  const [zeme, setZeme] = useState<string>("");
  const [mesto, setMesto] = useState<string>("");
  const [adresa, setAdresa] = useState<string>("");
  const [psc, setPsc] = useState<number>(0);
  const { id } = useParams();

  const saveOrUpdatePacient = (e: React.FormEvent) => {
    e.preventDefault();

    const pacient = {
      idAdresa,
      jmeno,
      prijmeni,
      datumHospitalizace,
      datumNarozeni,
      cisloTelefonu,
      pohlavi,
      zeme,
      mesto,
      adresa,
      psc,
    };

    console.log(pacient);

    PacientService.createPacient(pacient)
      .then((response) => {
        console.log(response.data);
        navigate("/pacienti");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update pacient</h2>;
    } else {
      return <h2 className="text-center">Add pacient</h2>;
    }
  };

  return (
    <div>
      <div>
        {title()}

        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <div>
                      <label>Id adresa</label>
                    </div>
                    <div>
                      <input
                        placeholder="-"
                        type="number"
                        name="idAdresa"
                        className="form-control"
                        value={idAdresa}
                        onChange={(e) =>
                          setIdAdresa(parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                  </div>

                  {/* Jmeno */}
                  <div className="form-group mb-2">
                    <div>
                      <label>Jmeno</label>
                    </div>
                    <div>
                      <input
                        placeholder="-"
                        type="text"
                        name="jmeno"
                        className="form-control"
                        value={jmeno}
                        onChange={(e) => setJmeno(e.target.value)}
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
                        className="form-control"
                        value={prijmeni}
                        onChange={(e) => setPrijmeni(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Datum Hospitalizace     */}
                  <div>
                    <div>
                      <label>Datum Hospitalizace</label>
                    </div>
                    <div>
                      {" "}
                      <input
                        placeholder="-"
                        type="date"
                        name="datumHospitalizace"
                        className="form-control"
                        value={datumHospitalizace?.toISOString().split("T")[0]} // Преобразуем в строку в формате YYYY-MM-DD
                        onChange={(e) =>
                          setDatumHospitalizace(new Date(e.target.value))
                        }
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
                        className="form-control"
                        value={datumNarozeni?.toISOString().split("T")[0]} // Преобразуем в строку в формате YYYY-MM-DD
                        onChange={(e) =>
                          setDatumNarozeni(new Date(e.target.value))
                        }
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
                        className="form-control"
                        value={cisloTelefonu}
                        onChange={(e) =>
                          setCisloTelefonu(parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                  </div>

                  {/* Pohlavi */}
                  <div>
                    <div>
                      <label>Pohlavi</label>
                    </div>

                    <div>
                      <input
                        placeholder="-"
                        type="text"
                        name="pohlavi"
                        className="form-control"
                        value={pohlavi}
                        onChange={(e) => setPohlavi(e.target.value)}
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
                        className="form-control"
                        value={zeme}
                        onChange={(e) => setZeme(e.target.value)}
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
                        className="form-control"
                        value={mesto}
                        onChange={(e) => setMesto(e.target.value)}
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
                        className="form-control"
                        value={adresa}
                        onChange={(e) => setAdresa(e.target.value)}
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
                        className="form-control"
                        value={psc}
                        onChange={(e) => setPsc(parseInt(e.target.value, 10))}
                      />
                    </div>
                  </div>

                  <div>
                    <Link to="/pacienti">
                      <button type="button" className="btn btn-danger">
                        Back
                      </button>
                    </Link>

                    <Link to="/pacienti">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) => saveOrUpdatePacient(e)}
                      >
                        Submit
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPacient;
