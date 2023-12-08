import axios, { AxiosResponse } from "axios";
import {User} from "../model/security/User.tsx";
import {RegisterRequest} from "../model/request/RegisterRequest.tsx";
import {LoginRequest} from "../model/request/LoginRequest.tsx";


const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {
    // Метод для регистрации нового пользователя
    register(registerData: RegisterRequest): Promise<AxiosResponse<void>> {
        return axios.post<void>(`${BASE_URL}/registration`, registerData);
    }

    // Метод для входа пользователя в систему
    login(loginData: LoginRequest): Promise<AxiosResponse<User>> {
        return axios.post<User>(`${BASE_URL}/login`, loginData);
    }

}

export default new AuthService();
