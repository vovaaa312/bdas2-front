import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { saveAs } from 'file-saver';

import {LogData} from "../model/LogData.tsx";
import LogDataService from "../services/LogDataService.tsx";
import {StorageUserData} from "../model/response/StorageUserData.tsx";
import LocalStorageService from "../services/LocalStorageService.tsx";
import {USER_ROLES} from "../model/USER_ROLES.tsx";

const LogList: React.FC = () => {
    const [logList, setLogList] = useState<LogData[]>([]);
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
    }, [user]);

    const getAll = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            LogDataService.getAll()
                .then((response) => {
                    setLogList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };

    const pageTitle = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
            return <h1>Logs</h1>

        } else return <h1>Nedostatečná práva pro přístup k těmto údajům</h1>

    }

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(row =>
            Object.values(row).map(value =>
                `"${value.toString().replace(/"/g, '""')}"`
            ).join(',')
        ).join('\n');

        return header + '\n' + rows;
    };

    const downloadJSON = () => {
        const jsonContent = JSON.stringify(logList, null, 2); // Форматирование JSON для удобочитаемости
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        saveAs(blob, 'logs.json');
    };



    const table = () => {
        if (user?.roleName === USER_ROLES.ADMIN) {
        return <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">TIME</th>
                <th scope="col">EDITED TABLE</th>
                <th scope="col">EDITED DATA</th>
                <th scope="col">LOGIN</th>

            </tr>
            </thead>
            <tbody>
            {logList.map((log) => (
                <tr key={log.idLog}>
                    {/*<td>{formatDate(new Date(log.time))}</td>*/}
                    <td>{log.time}</td>

                    <td>{log.editedTable}</td>

                    <td>{log.editedData}</td>
                    <td>{log.login}</td>
                </tr>
            ))}
            </tbody>
        </table>

        }
    }
    return (
        <div>
            {pageTitle()}
            <div>
                <button className="btn btn-primary" type="button" onClick={downloadJSON}>
                    Download JSON
                </button>
            </div>

            {table()}

            </div>
    );

}
export default LogList;
