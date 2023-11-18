// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import PacientList from "./components/pacient/PacientList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/pacients" element={<PacientList />} />
      </Routes>
    </div>
  );
}

export default App;
