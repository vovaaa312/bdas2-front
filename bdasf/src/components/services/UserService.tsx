import axios, { AxiosResponse } from "axios";
import {User} from "../model/security/User.tsx";
import {RegisterRequest} from "../model/request/RegisterRequest.tsx";
import {NewPasswordRequest} from "../model/request/NewPasswordRequest.tsx";


const BASE_URL = "http://localhost:8080/api/users";

class UserService {
    // Метод для регистрации нового пользователя
    register(registerData: RegisterRequest): Promise<AxiosResponse<void>> {
        return axios.post<void>(`${BASE_URL}/registration`, registerData);
    }



    getUserDetails(login: number): Promise<AxiosResponse<User>> {
        return axios.get<User>(`${BASE_URL}/${login}`);
    }

    changePassword(passwordRequest: NewPasswordRequest):Promise<AxiosResponse<void>>{
        return axios.post<void>(`${BASE_URL}/changePassword`, passwordRequest);
    }

    getAllUsers(): Promise<AxiosResponse<User[]>> {
        return axios.get<User[]>(BASE_URL);
    }
    deleteUser(userId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${userId}`);
    }


}

export default new UserService();
