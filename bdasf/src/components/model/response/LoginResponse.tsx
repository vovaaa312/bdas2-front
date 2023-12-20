export interface LoginResponse {
    userId:number
    login: string;
    roleName: string;
    jwt: string;

    pacId:number;
    zamId:number;
}