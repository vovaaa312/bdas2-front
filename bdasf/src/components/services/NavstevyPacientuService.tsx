import axios, { AxiosResponse } from "axios";
import {NavstevaPacienta} from "../model/NavstevaPacienta.tsx";

const BASE_URL = "http://localhost:8080/api/navstevy-pacientu";

class NavstevyPacientuService {



    getAllNavstevy(): Promise<AxiosResponse<NavstevaPacienta[]>> {
        return axios.get<NavstevaPacienta[]>(BASE_URL);
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

    getByOddeleniId(oddeleniId: number): Promise<AxiosResponse<NavstevaPacienta[]>> {
        return axios.get<NavstevaPacienta[]>(`${BASE_URL}/oddeleni/${oddeleniId}`);
    }


    getByNavstevaId(navstevaId: number):Promise<AxiosResponse<NavstevaPacienta>>{
        return axios.get<NavstevaPacienta>(`${BASE_URL}/${navstevaId}`);    }

    updateNavsteva(
        navstevaId: number,
        navsteva: NavstevaPacienta
    ): Promise<AxiosResponse<NavstevaPacienta>> {
        return axios.put<NavstevaPacienta>(`${BASE_URL}/${navstevaId}`, navsteva);
    }

    deleteNavsteva(navstevaId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${navstevaId}`);
    }

}

export default new NavstevyPacientuService();