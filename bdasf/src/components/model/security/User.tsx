//
// export type AuthUser{
//     user:User|null
//     jwt:string|null
// }

export type User={
    id: number,  // Изменение с userId на id
    login:string,
    password:string,
    roleId:number,
    roleName:string

    pacientId:number,
    zamestnanecId:number

}