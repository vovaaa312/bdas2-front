import axios, { AxiosResponse } from "axios";
import {ZamestnanecAdresa} from "../model/ZamestnanecAdresa.tsx";

const BASE_URL = "http://localhost:8080/api/zamestnanci-data";

class ZamestnanecVService {
    getAllZamestnanci(): Promise<AxiosResponse<ZamestnanecAdresa[]>> {
        return axios.get<ZamestnanecAdresa[]>(BASE_URL);
    }

    createZamestnanec(pacient: ZamestnanecAdresa): Promise<AxiosResponse<ZamestnanecAdresa>> {
        return axios.post<ZamestnanecAdresa>(BASE_URL, pacient);
    }

    getZamestnanecById(pacientId: number): Promise<AxiosResponse<ZamestnanecAdresa>> {
        return axios.get<ZamestnanecAdresa>(`${BASE_URL}/${pacientId}`);
    }

    updateZamestnanec(
        zamestnanecId: number,
        zamestnanec: ZamestnanecAdresa
    ): Promise<AxiosResponse<ZamestnanecAdresa>> {
        return axios.put<ZamestnanecAdresa>(`${BASE_URL}/${zamestnanecId}`, zamestnanec);
    }

    deleteZamestnanec(zamestnanecId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${zamestnanecId}`);
    }
}

export default new ZamestnanecVService();
