import {UserRole} from "./UserRole.tsx";

export type User={
    userId:number,
    login:string,
    password:string,
    userRole:UserRole

}