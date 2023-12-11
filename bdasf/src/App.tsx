// App.tsx
import {Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

import UserList from "./components/entityLists/UserList.tsx";
import AddUser from "./components/createPages/AddUser.tsx";
import PacientiAdresyList from "./components/entityLists/PacientiAdresyList.tsx";
import AddPacientAdresa from "./components/createPages/AddPacientAdresa.tsx";
import ZamestnanciDataList from "./components/entityLists/ZamestnanciDataList.tsx";
import AddZamestnanecData from "./components/createPages/AddZamestnanecData.tsx";
import ChooseUserRolePage from "./components/ChooseUserRolePage.tsx";
import PacientiKartyList from "./components/entityLists/PacientiKartyList.tsx";
import AddPacientKarta from "./components/createPages/AddPacientKarta.tsx";

function App() {
    return (
        <div>
            <Header></Header>

            <Routes>


                <Route path="/select-role" element={<ChooseUserRolePage/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/addUser" element={<AddUser/>}/>
                <Route path="/edit-user/:id" element={<AddUser/>}/>

                /edit-user/

                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>

                {/*<Route path="/pacienti" element={<PacientList />} />*/}
                {/*<Route path="/addPacient" element={<AddPacient />} />*/}
                {/*<Route path="/edit-pacient/:id" element={<AddPacient />} />*/}

                <Route path="/pacienti-karty" element={<PacientiKartyList/>}/>
                <Route path="/add-pacient-karta" element={<AddPacientKarta/>}/>
                <Route path="/edit-pacient-karta/:id" element={<AddPacientKarta/>}/>

                <Route path="/pacienti-adresy" element={<PacientiAdresyList/>}/>
                <Route path="/addPacientAdresa" element={<AddPacientAdresa/>}/>
                <Route path="/edit-pacient-adresa/:id" element={<AddPacientAdresa/>}/>

                <Route path="/zamestnanci-data" element={<ZamestnanciDataList/>}/>
                <Route path="/addZamestnanec" element={<AddZamestnanecData/>}/>
                <Route path="/edit-zamestnanec/:id" element={<AddZamestnanecData/>}/>

            </Routes>

            <Footer></Footer>
        </div>
    );
}

export default App;
