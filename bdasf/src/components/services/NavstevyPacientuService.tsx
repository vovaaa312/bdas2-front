import axios, { AxiosResponse } from "axios";
import {NavstevaPacienta} from "../model/NavstevaPacienta.tsx";

const BASE_URL = "http://localhost:8080/api/navstevy-pacientu";

class NavstevyPacientuService {



    getAllNavstevy(): Promise<AxiosResponse<NavstevaPacienta[]>> {
        return axios.get<PacientLuzko[]>(BASE_URL);
    }

    createNavsteva(navsteva: NavstevaPacienta): Promise<AxiosResponse<NavstevaPacienta>> {
        return axios.post<NavstevaPacienta>(BASE_URL, navsteva);
    }

    getByPacientId(pacientId: number): Promise<AxiosResponse<NavstevaPacienta[]>> {
        return axios.get<NavstevaPacienta[]>(`${BASE_URL}/pacient/${pacientId}`);
    }
    getByZamestnanecId(zamestnanecId: number): Promise<AxiosResponse<NavstevaPacienta[]>> {
        return axios.get<NavstevaPacienta[]>(`${BASE_URL}/zamestnanec/${zamestnanecId}`);
    }
    getByNavstevaId(navstevaId: number):Promise<AxiosResponse<NavstevaPacienta>>{
        return axios.get<NavstevaPacienta>(`${BASE_URL}/${navstevaId}`);    }

    updateNavsteva(
        navstevaId: number,
        navsteva: NavstevaPacienta
    ): Promise<AxiosResponse<NavstevaPacienta>> {
        return axios.put<NavstevaPacienta>(`${BASE_URL}/${navstevaId}`, navsteva);
    }

}

export default new NavstevyPacientuService();