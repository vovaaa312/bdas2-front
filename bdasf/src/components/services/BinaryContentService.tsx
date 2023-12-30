    import axios, {AxiosResponse} from "axios";
    import {BinaryContent} from "../model/BinaryContent.tsx";
    const BASE_URL = "http://localhost:8080/api/binarycontent";


    class BinaryContentService {

        getById(id: number): Promise<AxiosResponse<BinaryContent>> {
            return axios.get<BinaryContent>(`${BASE_URL}/${id}`);
        }

        static getBinaryContentByUserId(id: number): Promise<AxiosResponse<BinaryContent>> {
            return axios.get<BinaryContent>(`${BASE_URL}/user/${id}`);
        }

        static uploadBinaryContent(file: File, uploadedBy: number): Promise<AxiosResponse<void>> {
            const formData = new FormData();
            formData.append("file", file);
            return axios.post<void>(`${BASE_URL}/insert/${uploadedBy}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }
    }

    export default BinaryContentService;