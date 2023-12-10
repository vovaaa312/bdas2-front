// App.tsx
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

import React from "react";
import UserList from "./components/entityLists/UserList.tsx";
import AddUser from "./components/createPages/AddUser.tsx";
import PacientiAdresyList from "./components/entityLists/PacientiAdresyList.tsx";
import AddPacientView from "./components/createPages/AddPacientView.tsx";
import ZamestnanciDataList from "./components/entityLists/ZamestnanciDataList.tsx";
import AddZamestnanecData from "./components/createPages/AddZamestnanecData.tsx";
import Hello from "./components/Hello.tsx";

function App() {
    return (
        <div>
            <Header></Header>

            <Routes>
                <Route path="/hello" element={<Hello/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/addUser" element={<AddUser/>}/>
                <Route path="/edit-user/:id" element={<AddUser/>}/>

                /edit-user/

                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>

                {/*<Route path="/pacienti" element={<PacientList />} />*/}
                {/*<Route path="/addPacient" element={<AddPacient />} />*/}
                {/*<Route path="/edit-pacient/:id" element={<AddPacient />} />*/}

                <Route path="/pacienti-adresy" element={<PacientiAdresyList/>}/>
                <Route path="/addPacientAdresa" element={<AddPacientView/>}/>
                <Route path="/edit-pacient-adresa/:id" element={<AddPacientView/>}/>

                <Route path="/zamestnanci-data" element={<ZamestnanciDataList/>}/>
                <Route path="/addZamestnanec" element={<AddZamestnanecData/>}/>
                <Route path="/edit-zamestnanec/:id" element={<AddZamestnanecData/>}/>

            </Routes>

            <Footer></Footer>
        </div>
    );
}

export default App;
