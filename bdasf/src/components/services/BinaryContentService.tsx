import axios, {AxiosResponse} from "axios";
import {BinaryContent} from "../model/BinaryContent.tsx";
const BASE_URL = "http://localhost:8080/api/binarycontent";


class BinaryContentService {

    getById(id: number): Promise<AxiosResponse<BinaryContent>> {
        return axios.get<BinaryContent>(`${BASE_URL}/${id}`);
    }

}

export default BinaryContentService;