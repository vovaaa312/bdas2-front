import axios, {AxiosResponse} from "axios";
import {PokojeOddeleni} from "../model/PokojeOddeleni.tsx";

const BASE_URL = "http://localhost:8080/api/pokoje-oddeleni";

class PokojeOddeleniService {

    getAllPokoje(): Promise<AxiosResponse<PokojeOddeleni[]>> {
        return axios.get<PokojeOddeleni[]>(BASE_URL);
    }

    createPokoj(pokoj: PokojeOddeleni): Promise<AxiosResponse<PokojeOddeleni>> {
        return axios.post<PokojeOddeleni>(BASE_URL, pokoj);
    }

    getPokojById(pokojId: number): Promise<AxiosResponse<PokojeOddeleni>> {
        return axios.get<PokojeOddeleni>(`${BASE_URL}/${pokojId}`);
    }

    getByOddeleniId(oddeleniId: number): Promise<AxiosResponse<PokojeOddeleni>> {
        return axios.get<PokojeOddeleni>(`${BASE_URL}/oddeleni/${oddeleniId}`);
    }

    updatePokoj(
        pokojId: number,
        pokoj: PokojeOddeleni
    ): Promise<AxiosResponse<PokojeOddeleni>> {
        return axios.put<PokojeOddeleni>(`${BASE_URL}/${pokojId}`, pokoj);
    }

    deletePokoj(pokojId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pokojId}`);
    }
}

export default new PokojeOddeleniService();