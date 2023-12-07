import axios, { AxiosResponse } from "axios";
import {PacientView} from "../entity/PacientView.tsx";

const BASE_URL = "http://localhost:8080/api/pacienti-data";

class PacientViewService {
    getAllPacienti(): Promise<AxiosResponse<PacientView[]>> {
        return axios.get<PacientView[]>(BASE_URL);
    }

    createPacient(pacient: PacientView): Promise<AxiosResponse<PacientView>> {
        return axios.post<PacientView>(BASE_URL, pacient);
    }

    getPacientById(pacientId: number): Promise<AxiosResponse<PacientView>> {
        return axios.get<PacientView>(`${BASE_URL}/${pacientId}`);
    }

    updatePacient(
        pacientId: number,
        pacient: PacientView
    ): Promise<AxiosResponse<PacientView>> {
        return axios.put<PacientView>(`${BASE_URL}/${pacientId}`, pacient);
    }

    deletePacient(pacientId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pacientId}`);
    }
}

export default new PacientViewService();
