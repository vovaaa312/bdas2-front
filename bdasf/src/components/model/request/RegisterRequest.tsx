import {UserRole} from "../security/UserRole.tsx";

export type RegisterRequest={
    username:string,
    password:string,
    role:UserRole
}