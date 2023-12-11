import axios, { AxiosResponse } from "axios";
import {User} from "../model/security/User.tsx";
import {RegisterRequest} from "../model/request/RegisterRequest.tsx";
import {NewPasswordRequest} from "../model/request/NewPasswordRequest.tsx";
import {ChangeRoleRequest} from "../model/request/ChangeRoleRequest.tsx";


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

    changeUserRole(changeRoleRequest:ChangeRoleRequest):Promise<AxiosResponse<void>>{
        return axios.post<void>(`${BASE_URL}/changerole`, changeRoleRequest);
    }

    getAllUsers(): Promise<AxiosResponse<User[]>> {
        return axios.get<User[]>(BASE_URL);
    }
    deleteUser(userId: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${BASE_URL}/${userId}`);
    }

    createUser(user: User):Promise<AxiosResponse<User>>{
        return axios.post<User>(BASE_URL,user)
    }

    updateUser(userId:number, user:User):Promise<AxiosResponse<User>>{
        return axios.put<User>(`${BASE_URL}/${userId}`, user)
    }

    getUserById(id:number):Promise<AxiosResponse<User>>{
        return axios.get<User>(`${BASE_URL}/${id}`);
    }


}

export default new UserService();
