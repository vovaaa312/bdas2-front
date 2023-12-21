import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DatabaseService from "../services/DatabaseService.tsx";
import {TableColumn} from "../model/TableColumn.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";

const LogList: React.FC = () => {
    const [tableColumn, setTableColumn] = useState<TableColumn[]>([]);
    const [user, setUser] = useState<StorageUserData | null>(null);

    useEffect(() => {
        const userData = LocalStorageService.getUserFromLocalStorage();
        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);

    useEffect(() => {
        getAll();


    }, []);

    const getAll = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            DatabaseService.getAll()
                .then((response) => {
                    setTableColumn(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };

    const pageTitle = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <h1>System catalog</h1>

        } else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    const table=()=>{
        if(user?.roleName===USER_ROLES.ADMIN){
           return  <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">TABLE NAME</th>
                    <th scope="col">COLUMN NAME</th>
                    <th scope="col">DATA TYPE</th>
                    <th scope="col">DATA LENGTH</th>

                </tr>
                </thead>
                <tbody>
                {tableColumn.map((data) => (
                    <tr key={data.tableName}>
                        <td>{data.tableName}</td>
                        <td>{data.columnName}</td>

                        <td>{data.dataType}</td>
                        <td>{data.dataLength}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        }
    }

    return (
        <div>
            {pageTitle()}

            {table()}

        </div>
    );

}
export default LogList;
