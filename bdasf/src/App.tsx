// App.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import PacientList from "./components/pacient/PacientList";
import AddPacient from "./components/pacient/AddPacient";
import ZamestnanecList from "./components/zamestnanci/ZamestnanecList";
import AddZamestnanec from "./components/zamestnanci/AddZamestnanec";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";
import PacientiAdresyList from "./components/pacientAdresa/PacientiAdresyList.tsx";
import AddPacientAdresa from "./components/pacientAdresa/AddPacientAdresa.tsx";

function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/*<Route path="/pacienti" element={<PacientList />} />*/}
        {/*<Route path="/addPacient" element={<AddPacient />} />*/}
        {/*<Route path="/edit-pacient/:id" element={<AddPacient />} />*/}

          <Route path="/pacienti" element={<PacientiAdresyList />} />
          <Route path="/addPacient" element={<AddPacientAdresa />} />
        <Route path="/zamestnanci" element={<ZamestnanecList />} />
        <Route path="/addZamestnanec" element={<AddZamestnanec />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
