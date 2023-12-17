import axios, { AxiosResponse } from "axios";
import {TableColumn} from "../model/TableColumn.tsx";
const BASE_URL = "http://localhost:8080/api/database";

class LogDataService {
    getAll(): Promise<AxiosResponse<TableColumn[]>> {
        return axios.get<TableColumn[]>(`${BASE_URL}/tables/columns`);
    }

}

export default new LogDataService();