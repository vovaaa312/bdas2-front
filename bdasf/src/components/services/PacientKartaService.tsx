import axios, { AxiosResponse } from "axios";
import {PacientKarta} from "../model/PacientKarta.tsx";

const BASE_URL = "http://localhost:8080/api/pacienti-karty";

class PacientKartaService {



    getAllPacienti(): Promise<AxiosResponse<PacientKarta[]>> {
        return axios.get<PacientKarta[]>(BASE_URL);
    }

    createPacient(pacient: PacientKarta): Promise<AxiosResponse<PacientKarta>> {
        return axios.post<PacientKarta>(BASE_URL, pacient);
    }

    getByKartaId(kartaId: number): Promise<AxiosResponse<PacientKarta>> {
        return axios.get<PacientKarta>(`${BASE_URL}/karta/${kartaId}`);
    }

    getByPacientId(pacientId: number):Promise<AxiosResponse<PacientKarta[]>>{
        return axios.get<PacientKarta[]>(`${BASE_URL}/pacient/${pacientId}`);    }

    updateKarta(
        kartaId: number,
        karta: PacientKarta
    ): Promise<AxiosResponse<PacientKarta>> {
        return axios.put<PacientKarta>(`${BASE_URL}/${kartaId}`, karta);
    }

    deleteKarta(pacientId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pacientId}`);
    }
}

export default new PacientKartaService();
