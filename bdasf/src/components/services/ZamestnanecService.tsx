import axios, { AxiosResponse } from "axios";
import {Zamestnanec} from "../model/Zamestnanec.tsx";

const BASE_URL = "http://localhost:8080/api/zamestnanci";

class ZamestnanecService {
    getAllZamestnanci(): Promise<AxiosResponse<Zamestnanec[]>> {
        return axios.get<Zamestnanec[]>(BASE_URL);
    }

    createZamestnanec(pacient: Zamestnanec): Promise<AxiosResponse<Zamestnanec>> {
        return axios.post<Zamestnanec>(BASE_URL, pacient);
    }



    getZamestnanecById(zamestnanecId: number): Promise<AxiosResponse<Zamestnanec>> {
        console.log("asdkjhajsdhkkjhadskjhasd");
        return axios.get<Zamestnanec>(`${BASE_URL}/${zamestnanecId}`);
    }

    updatePacient(
        zamestnanecId: number,
        zamestnanec: Zamestnanec
    ): Promise<AxiosResponse<Zamestnanec>> {
        return axios.put<Zamestnanec>(`${BASE_URL}/${zamestnanecId}`, zamestnanec);
    }

    deleteZamestnanec(zamestnanecId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${zamestnanecId}`);
    }
}

export default new ZamestnanecService();
