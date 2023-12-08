// App.tsx
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

import React from "react";
import AddPacient from "./components/createPages/AddPacient.tsx";
import PacientList from "./components/entityLists/PacientList.tsx";
import ZamestnanecList from "./components/entityLists/ZamestnanecList.tsx";
import AddZamestnanec from "./components/createPages/AddZamestnanec.tsx";
import UserList from "./components/entityLists/UserList.tsx";

function App() {
    return (
        <div>
            <Header></Header>

            <Routes>
                <Route path="/users" element={<UserList/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>

                <Route path="/pacienti" element={<PacientList />} />
                <Route path="/addPacient" element={<AddPacient />} />
                <Route path="/edit-pacient/:id" element={<AddPacient />} />

                {/*<Route path="/pacienti" element={<PacientiViewList/>}/>*/}
                {/*<Route path="/addPacient" element={<AddPacientView/>}/>*/}
                {/*<Route path="/edit-pacient/:id" element={<AddPacientView/>}/>*/}

                <Route path="/zamestnanci" element={<ZamestnanecList/>}/>
                <Route path="/addZamestnanec" element={<AddZamestnanec/>}/>
                <Route path="/edit-zamestnanec/:id" element={<AddZamestnanec/>}/>

            </Routes>

            <Footer></Footer>
        </div>
    );
}

export default App;
