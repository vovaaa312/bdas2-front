// App.tsx
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import Footer from "./components/Footer";

import "./App.css";

import UserList from "./components/entityLists/UserList.tsx";
import AddUser from "./components/createPages/AddUser.tsx";
import PacientiAdresyList from "./components/entityLists/PacientiAdresyList.tsx";
import AddPacientAdresa from "./components/createPages/AddPacientAdresa.tsx";
import ZamestnanciDataList from "./components/entityLists/ZamestnanciDataList.tsx";
import AddZamestnanecData from "./components/createPages/AddZamestnanecData.tsx";
import PacientiKartyList from "./components/entityLists/PacientiKartyList.tsx";
import AddPacientKarta from "./components/createPages/AddPacientKarta.tsx";
import PacientiAnalyzyList from "./components/entityLists/PacientiAnalyzyList.tsx";
import AddPacientAnalyza from "./components/createPages/AddPacientAnalyza.tsx";
import PokojeDataList from "./components/entityLists/PokojeOddeleniList.tsx";
import AddPokoj from "./components/createPages/AddPokoj.tsx";
import PacientiLuzkaList from "./components/entityLists/PacientiLuzkaList.tsx";
import PacientiRezervaceList from "./components/entityLists/PacientiRezervaceList.tsx";
import AddLuzko from "./components/createPages/AddLuzko.tsx";
import NavstevyPacientuList from "./components/entityLists/NavstevyPacientuList.tsx";
import AddNavsteva from "./components/createPages/AddNavsteva.tsx";
import LogList from "./components/entityLists/LogList.tsx";
import SystemCatalogList from "./components/entityLists/SystemCatalogList.tsx";

import TestLogin from "./components/auth/TestLogin.tsx";
import Header from "./components/Header.tsx";

function App() {
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/add-user" element={<AddUser/>}/>
                <Route path="/edit-user/:id" element={<AddUser/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>

                <Route path="/pacienti-analyzy" element={<PacientiAnalyzyList/>}/>
                <Route path="/add-pacient-analyza" element={<AddPacientAnalyza/>}/>
                <Route path="/edit-pacient-analyza/:id" element={<AddPacientAnalyza/>}/>

                <Route path="/pacienti-karty" element={<PacientiKartyList/>}/>
                <Route path="/add-pacient-karta" element={<AddPacientKarta/>}/>
                <Route path="/edit-pacient-karta/:id" element={<AddPacientKarta/>}/>

                <Route path="/pacienti-adresy" element={<PacientiAdresyList/>}/>
                <Route path="/add-pacient-adresa" element={<AddPacientAdresa/>}/>
                <Route path="/edit-pacient-adresa/:id" element={<AddPacientAdresa/>}/>

                <Route path="/zamestnanci-data" element={<ZamestnanciDataList/>}/>
                <Route path="/add-zamestnanec" element={<AddZamestnanecData/>}/>
                <Route path="/edit-zamestnanec/:id" element={<AddZamestnanecData/>}/>

                <Route path="/pokoje-data" element={<PokojeDataList/>}/>
                <Route path="/add-pokoj" element={<AddPokoj/>}/>
                <Route path="/edit-pokoj/:id" element={<AddPokoj/>}/>

                <Route path="/luzka/:id" element={<PacientiLuzkaList/>}/>
                <Route path="/luzka/:id/rezervace-luzka/:id" element={<PacientiRezervaceList/>}/>
                <Route path="/add-luzko/:id" element={<AddLuzko/>}/>

                <Route path="/navstevy-pacientu" element={<NavstevyPacientuList/>}/>
                <Route path="/add-navsteva" element={<AddNavsteva/>}/>

                <Route path="/logs" element={<LogList/>}/>
                <Route path="/catalog" element={<SystemCatalogList/>}/>


                <Route path="/test-login" element={<TestLogin/>}/>

            </Routes>


            <Footer></Footer>
        </div>
    );
}

export default App;


{/*<Route path="/pacienti" element={<PacientList />} />*/
}
{/*<Route path="/addPacient" element={<AddPacient />} />*/
}
{/*<Route path="/edit-pacient/:id" element={<AddPacient />} />*/
}