import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080/api/pacienti";

interface Pacient {
  idAdresa: number;
  jmeno: string;
  prijmeni: string;
  datumHospitalizace: Date | null;
  datumNarozeni: Date | null;
  cisloTelefonu: number;
  pohlavi: string;
  zeme: string;
  mesto: string;
  adresa: string;
  psc: number;
}

class PacientService {
  getAllPacienti(): Promise<AxiosResponse<Pacient[]>> {
    return axios.get<Pacient[]>(BASE_URL);
  }

  createPacient(pacient: Pacient): Promise<AxiosResponse<Pacient>> {
    return axios.post<Pacient>(BASE_URL, pacient);
  }

  getPacientById(pacientId: number): Promise<AxiosResponse<Pacient>> {
    return axios.get<Pacient>(`${BASE_URL}/${pacientId}`);
  }

  updatePacient(
    pacientId: number,
    pacient: Pacient
  ): Promise<AxiosResponse<Pacient>> {
    return axios.put<Pacient>(`${BASE_URL}/${pacientId}`, pacient);
  }

  deletePacient(pacientId: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${BASE_URL}/${pacientId}`);
  }
}

export default new PacientService();
