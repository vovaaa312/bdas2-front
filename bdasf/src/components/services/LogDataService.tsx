import axios, { AxiosResponse } from "axios";
import {LogData} from "../model/LogData.tsx";
const BASE_URL = "http://localhost:8080/api/logs";

class LogDataService {
    getAll(): Promise<AxiosResponse<LogData[]>> {
        return axios.get<LogData[]>(`${BASE_URL}`);
    }

}

export default new LogDataService();