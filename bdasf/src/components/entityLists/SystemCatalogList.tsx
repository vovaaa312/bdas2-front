import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {TableColumn} from '../model/Types.ts'
import DatabaseService from "../services/DatabaseService.tsx";

const LogList:React.FC=()=>{
    const [tableColumn, setTableColumn] = useState<TableColumn[]>([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        DatabaseService.getAll()
            .then((response) => {
                setTableColumn(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1>System catalog</h1>
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
        </div>
    );

}
export default LogList;
