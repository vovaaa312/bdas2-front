import axios, { AxiosResponse } from "axios";
import {Oddeleni} from "../entity/Oddeleni.tsx";

const BASE_URL = "http://localhost:8080/api/oddeleni";

class OddeleniService {
    getAllOddeleni(): Promise<AxiosResponse<Oddeleni[]>> {
        return axios.get<Oddeleni[]>(BASE_URL);
    }

    createOddeleni(oddeleni: Oddeleni): Promise<AxiosResponse<Oddeleni>> {
        return axios.post<Oddeleni>(BASE_URL, oddeleni);
    }

    getOddeleniById(oddeleniId: number): Promise<AxiosResponse<Oddeleni>> {
        return axios.get<Oddeleni>(`${BASE_URL}/${oddeleniId}`);
    }

    deleteOddeleni(oddeleniId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${oddeleniId}`);
    }
}

export default new OddeleniService();
