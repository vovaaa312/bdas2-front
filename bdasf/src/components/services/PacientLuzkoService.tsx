import axios, {AxiosResponse} from "axios";
import {PacientLuzko} from "../model/PacientLuzko.tsx";
import {RezervaceLuzkaRequest} from "../model/request/RezervaceLuzkaRequest.tsx";

const BASE_URL = "http://localhost:8080/api/pacienti-luzka";

class PacientiLuzkaService {


    getAllLuzka(): Promise<AxiosResponse<PacientLuzko[]>> {
        return axios.get<PacientLuzko[]>(BASE_URL);
    }

    createLuzko(luzko: PacientLuzko): Promise<AxiosResponse<PacientLuzko>> {
        return axios.post<PacientLuzko>(BASE_URL, luzko);
    }

    releaseLuzko(luzkoId: number): Promise<AxiosResponse<PacientLuzko>> {
        return axios.put<PacientLuzko>(`${BASE_URL}/release/${luzkoId}`);
    }

    rezervaceLuzka(rezervaceRequest: RezervaceLuzkaRequest): Promise<AxiosResponse<RezervaceLuzkaRequest>> {
        return axios.post<RezervaceLuzkaRequest>(`${BASE_URL}/rezervace-luzka`, rezervaceRequest);
    }

    getByPokojId(pokojId: number): Promise<AxiosResponse<PacientLuzko[]>> {
        return axios.get<PacientLuzko[]>(`${BASE_URL}/pokoj/${pokojId}`);
    }

    getByPacientId(pacientId: number): Promise<AxiosResponse<PacientLuzko>> {
        return axios.get<PacientLuzko>(`${BASE_URL}/pacient/${pacientId}`);
    }

    getByLuzkoId(luzkoId: number): Promise<AxiosResponse<PacientLuzko>> {
        return axios.get<PacientLuzko>(`${BASE_URL}/luzko/${luzkoId}`);
    }

    updateLuzko(
        luzkoId: number,
        luzko: PacientLuzko
    ): Promise<AxiosResponse<PacientLuzko>> {
        return axios.put<PacientLuzko>(`${BASE_URL}/${luzkoId}`, luzko);
    }

    deleteLuzko(luzkoId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${luzkoId}`);
    }
}

export default new PacientiLuzkaService();