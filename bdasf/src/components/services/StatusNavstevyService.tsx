import axios, { AxiosResponse } from "axios";
import {StatusNavstevy} from "../model/StatusNavstevy.tsx";

const BASE_URL = "http://localhost:8080/api/status-navstevy";

class StatusNavstevyService {



    getAll(): Promise<AxiosResponse<StatusNavstevy[]>> {
        return axios.get<StatusNavstevy[]>(BASE_URL);
    }


    getById(statusId: number): Promise<AxiosResponse<StatusNavstevy>> {
        return axios.get<StatusNavstevy>(`${BASE_URL}/${statusId}`);
    }



}

export default new StatusNavstevyService();