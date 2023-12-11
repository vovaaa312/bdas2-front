import axios, { AxiosResponse } from "axios";
import {PacientAdresa} from "../model/PacientAdresa.tsx";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";

const BASE_URL = "http://localhost:8080/api/pacienti-analyzy";

class PacientAnalyzaService {
    getAllPacienti(): Promise<AxiosResponse<PacientAnalyza[]>> {
        return axios.get<PacientAnalyza[]>(BASE_URL);
    }

    createPacient(pacient: PacientAnalyza): Promise<AxiosResponse<PacientAnalyza>> {
        return axios.post<PacientAnalyza>(BASE_URL, pacient);
    }

    getPacientById(pacientId: number): Promise<AxiosResponse<PacientAnalyza>> {
        return axios.get<PacientAnalyza>(`${BASE_URL}/${pacientId}`);
    }

    updatePacient(
        pacientId: number,
        pacient: PacientAnalyza
    ): Promise<AxiosResponse<PacientAdresa>> {
        return axios.put<PacientAdresa>(`${BASE_URL}/${pacientId}`, pacient);
    }

    deletePacient(pacientId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pacientId}`);
    }
}

export default new PacientAnalyzaService();
