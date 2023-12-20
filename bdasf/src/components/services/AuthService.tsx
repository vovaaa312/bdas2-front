import axios, {AxiosResponse} from "axios";
import {RegisterRequest} from "../model/request/RegisterRequest.tsx";
import {LoginRequest} from "../model/request/LoginRequest.tsx";
import {LoginResponse} from "../model/response/LoginResponse.tsx";


const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {
    // Метод для регистрации нового пользователя
    register(registerData: RegisterRequest): Promise<AxiosResponse<void>> {
        return axios.post<void>(`${BASE_URL}/registration`, registerData);
    }



    login = async (loginRequest: LoginRequest): Promise<LoginResponse | undefined> => {
        console.log("AUTHHH");
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: loginRequest.login, password: loginRequest.password })
            });

            if (!response.ok) {
                const errorText = await response.json();
                console.error('Login failed:', errorText);
                throw new Error('Please check your email and password');
            }

            const text = await response.text();

            if (!text) {
                throw new Error('Empty response from server');
            }

            const data: LoginResponse = JSON.parse(text);
            console.log(data);

            localStorage.setItem('userId', data.userId.toString());
            localStorage.setItem('login', data.login);
            localStorage.setItem('roleName', data.roleName);
            localStorage.setItem('token', data.jwt);

            localStorage.setItem('pacId', data?.pacId.toString());
            localStorage.setItem('zamId', data?.zamId.toString());

            window.sessionStorage.setItem('authenticated', 'true');

            return data; // Возвращаем данные пользователя
        } catch (err) {
            console.error(err);
            throw err; // Прокидываем ошибку наверх
        }
    };

}



export default new AuthService();
