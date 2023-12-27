import axios, {AxiosResponse} from "axios";
import {OddeleniScore} from "../model/OddeleniScore.tsx";

const BASE_URL = "http://localhost:8080/api/homepage";

class HomePageService {

    getAvailableBedsInDepartment(id: number): Promise<AxiosResponse<number>> {
        return axios.get<number>(`${BASE_URL}/beds/${id}`);
    }

    vypocitatSkoreZdraviOddeleni(): Promise<AxiosResponse<OddeleniScore[]>> {
        return axios.get<OddeleniScore[]>(`${BASE_URL}/avgscore`);
    }
}

export default HomePageService;