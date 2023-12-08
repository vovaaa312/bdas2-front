import axios, { AxiosResponse } from "axios";
import {ZamestnanecView} from "../model/ZamestnanecView.tsx";

const BASE_URL = "http://localhost:8080/api/zamestnanci-data";

class ZamestnanecViewService {
    getAllZamestnanci(): Promise<AxiosResponse<ZamestnanecView[]>> {
        return axios.get<ZamestnanecView[]>(BASE_URL);
    }

    createZamestnanec(pacient: ZamestnanecView): Promise<AxiosResponse<ZamestnanecView>> {
        return axios.post<ZamestnanecView>(BASE_URL, pacient);
    }

    getZamestnanecById(pacientId: number): Promise<AxiosResponse<ZamestnanecView>> {
        return axios.get<ZamestnanecView>(`${BASE_URL}/${pacientId}`);
    }

    updateZamestnanec(
        zamestnanecId: number,
        zamestnanec: ZamestnanecView
    ): Promise<AxiosResponse<ZamestnanecView>> {
        return axios.put<ZamestnanecView>(`${BASE_URL}/${zamestnanecId}`, zamestnanec);
    }

    deleteZamestnanec(zamestnanecId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${zamestnanecId}`);
    }
}

export default new ZamestnanecViewService();
