import axios, { AxiosResponse } from "axios";
import {ZamestnanecData} from "../model/ZamestnanecData.tsx";

const BASE_URL = "http://localhost:8080/api/zamestnanci-data";

class ZamestnanecDataService {
    getAllZamestnanci(): Promise<AxiosResponse<ZamestnanecData[]>> {
        return axios.get<ZamestnanecData[]>(BASE_URL);
    }

    createZamestnanec(pacient: ZamestnanecData): Promise<AxiosResponse<ZamestnanecData>> {
        return axios.post<ZamestnanecData>(BASE_URL, pacient);
    }

    getAllByOddeleni(oddeleniId: number): Promise<AxiosResponse<ZamestnanecData>> {
        return axios.get<ZamestnanecData>(`${BASE_URL}/oddeleni/${oddeleniId}`);
    }

    getZamestnanecById(zamestnanecId: number): Promise<AxiosResponse<ZamestnanecData>> {
        return axios.get<ZamestnanecData>(`${BASE_URL}/${zamestnanecId}`);
    }

    updateZamestnanec(
        zamestnanecId: number,
        zamestnanec: ZamestnanecData
    ): Promise<AxiosResponse<ZamestnanecData>> {
        return axios.put<ZamestnanecData>(`${BASE_URL}/${zamestnanecId}`, zamestnanec);
    }

    deleteZamestnanec(zamestnanecId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${zamestnanecId}`);
    }
}

export default new ZamestnanecDataService();
