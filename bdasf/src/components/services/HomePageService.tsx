import axios, {AxiosResponse} from "axios";

const BASE_URL = "http://localhost:8080/api/homepage";

class HomePageService {

    getAvailableBedsInDepartment(id: number): Promise<AxiosResponse<number>> {
        return axios.get<number>(`${BASE_URL}/beds/${id}`);
    }
}

export default HomePageService;