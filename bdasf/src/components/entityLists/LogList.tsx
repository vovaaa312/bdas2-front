import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {LogData} from "../model/LogData.tsx";
import LogDataService from "../services/LogDataService.tsx";

const LogList:React.FC=()=>{
    const [logList, setLogList] = useState<LogData[]>([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        LogDataService.getAll()
            .then((response) => {
                setLogList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };
    return (
        <div>
            <h1>Logs</h1>
            <div>
                <Link to="/home-page">
                    <button className="btn btn-info" type="button">
                        Home page
                    </button>
                </Link>
            </div>

            <table className="table table-bordered">
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
                        <td>{formatDate(new Date(log.time))}</td>
                        <td>{log.editedTable}</td>

                        <td>{log.editedData}</td>
                        <td>{log.login}</td>
                       </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}
export default LogList;
