import axios, { AxiosResponse } from "axios";
import {PacientAnalyza} from "../model/PacientAnalyza.tsx";
import {OddeleniScore} from "../model/OddeleniScore.tsx";

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

    getByPacientId(pacientId: number): Promise<AxiosResponse<PacientAnalyza[]>> {
        return axios.get<PacientAnalyza[]>(`${BASE_URL}/pacient/${pacientId}`);
    }

    getByOddeleniId(oddeleniId: number): Promise<AxiosResponse<PacientAnalyza[]>> {
        return axios.get<PacientAnalyza[]>(`${BASE_URL}/oddeleni/${oddeleniId}`);
    }

    updateAnalyza(
        analyzaId: number,
        analyza: PacientAnalyza
    ): Promise<AxiosResponse<PacientAnalyza>> {
        return axios.put<PacientAnalyza>(`${BASE_URL}/${analyzaId}`, analyza);
    }

    deleteAnalyza(pacientId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pacientId}`);
    }

    vypocitatScoreZdraviOddeleni(): Promise<AxiosResponse<OddeleniScore[]>> {
        return axios.get<OddeleniScore[]>(`${BASE_URL}/avgscore`);
    }
}

export default new PacientAnalyzaService();
