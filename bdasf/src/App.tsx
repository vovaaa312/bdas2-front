// App.tsx
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";
import PacientiViewList from "./components/entityLists/PacientiViewList.tsx";
import AddPacientView from "./components/createPages/AddPacientView.tsx";

import ZamestnanciViewList from "./components/entityLists/ZamestnanciViewList.tsx";
import AddZamestnanecView from "./components/createPages/AddZamestnanecView.tsx";
import React from "react";
import AddPacient from "./components/createPages/AddPacient.tsx";
import PacientList from "./components/entityLists/PacientList.tsx";

function App() {
    return (
        <div>
            <Header></Header>

            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>

                <Route path="/pacienti" element={<PacientList />} />
                <Route path="/addPacient" element={<AddPacient />} />
                <Route path="/edit-pacient/:id" element={<AddPacient />} />

                {/*<Route path="/pacienti" element={<PacientiViewList/>}/>*/}
                {/*<Route path="/addPacient" element={<AddPacientView/>}/>*/}
                {/*<Route path="/edit-pacient/:id" element={<AddPacientView/>}/>*/}

                <Route path="/zamestnanci" element={<ZamestnanciViewList/>}/>
                <Route path="/addZamestnanec" element={<AddZamestnanecView/>}/>
                <Route path="/edit-zamestnanec/:id" element={<AddZamestnanecView/>}/>

            </Routes>

            <Footer></Footer>
        </div>
    );
}

export default App;
