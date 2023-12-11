import axios, { AxiosResponse } from "axios";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";

const BASE_URL = "http://localhost:8080/api/pacienti-analyzy";

class PacientAnalyzaService {
    getAllAnalyzy(): Promise<AxiosResponse<PacientAnalyza[]>> {
        return axios.get<PacientAnalyza[]>(BASE_URL);
    }

    createAnalyza(analyza: PacientAnalyza): Promise<AxiosResponse<PacientAnalyza>> {
        return axios.post<PacientAnalyza>(BASE_URL, analyza);
    }

    getByAnalyzaId(analyzaId: number): Promise<AxiosResponse<PacientAnalyza>> {
        return axios.get<PacientAnalyza>(`${BASE_URL}/${analyzaId}`);
    }

    updatePacient(
        analyzaId: number,
        analyza: PacientAnalyza
    ): Promise<AxiosResponse<PacientAnalyza>> {
        return axios.put<PacientAnalyza>(`${BASE_URL}/${analyzaId}`, analyza);
    }

    deleteAnalyza(pacientId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pacientId}`);
    }
}

export default new PacientAnalyzaService();
