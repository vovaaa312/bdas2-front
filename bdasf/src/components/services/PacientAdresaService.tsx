import axios, { AxiosResponse } from "axios";
import {PacientAdresa} from "../model/PacientAdresa.tsx";
import {PrumVekRequest} from "../model/request/PrumVekRequest.tsx";


const BASE_URL = "http://localhost:8080/api/pacienti-adresy";

class PacientAdresaService {
    getAllPacienti(): Promise<AxiosResponse<PacientAdresa[]>> {
        return axios.get<PacientAdresa[]>(BASE_URL);
    }

    getAllByOddeleni(oddeleniId:number): Promise<AxiosResponse<PacientAdresa[]>> {
        return axios.get<PacientAdresa[]>(`${BASE_URL}/oddeleni/${oddeleniId}`);
    }

    createPacient(pacient: PacientAdresa): Promise<AxiosResponse<PacientAdresa>> {
        return axios.post<PacientAdresa>(BASE_URL, pacient);
    }

    getPacientById(pacientId: number): Promise<AxiosResponse<PacientAdresa>> {
        return axios.get<PacientAdresa>(`${BASE_URL}/${pacientId}`);
    }

    updatePacient(
        pacientId: number,
        pacient: PacientAdresa
    ): Promise<AxiosResponse<PacientAdresa>> {
        return axios.put<PacientAdresa>(`${BASE_URL}/${pacientId}`, pacient);
    }

    deletePacient(pacientId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${pacientId}`);
    }

    vypocitatPrumernyVekPacientu(request: PrumVekRequest): Promise<AxiosResponse<number>> {
        return axios.post<number>(`${BASE_URL}/prum-vek`, request);
    }



    // vypocitatPrumernyVekPacientu(datumOd: string, datumDo: string, pohlavi: string): Promise<AxiosResponse<number>> {
    //     // Преобразование строк с датами в объекты типа Date
    //     const startDate = new Date(datumOd);
    //     const endDate = new Date(datumDo);
    //
    //     // Вы можете проверить, что даты были корректно преобразованы
    //     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    //         throw new Error('Неверный формат даты. Ожидается формат: YYYY-MM-DD');
    //     }
    //
    //     // Ваш код для выполнения запроса с использованием объектов Date
    //     return axios.get<number>(`${BASE_URL}/prum-vek?datumOd=${startDate}&datumDo=${endDate}$pohlavi=${pohlavi}`, {
    //         params: {
    //             datumOd: new Date(datumOd),
    //             datumDo: endDate,
    //             pohlavi,
    //         },
    //     });
    // }


}

export default new PacientAdresaService();
