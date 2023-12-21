// import React from "react";
// import UserList from "./components/entityLists/UserList.tsx";
// import AddUser from "./components/createPages/AddUser.tsx";
// import PacientiAnalyzyList from "./components/entityLists/PacientiAnalyzyList.tsx";
// import AddPacientAnalyza from "./components/createPages/AddPacientAnalyza.tsx";
// import PacientiKartyList from "./components/entityLists/PacientiKartyList.tsx";
// import AddPacientKarta from "./components/createPages/AddPacientKarta.tsx";
// import PacientiAdresyList from "./components/entityLists/PacientiAdresyList.tsx";
// import AddPacientAdresa from "./components/createPages/AddPacientAdresa.tsx";
// import ZamestnanciDataList from "./components/entityLists/ZamestnanciDataList.tsx";
// import AddZamestnanecData from "./components/createPages/AddZamestnanecData.tsx";
// import PokojeDataList from "./components/entityLists/PokojeOddeleniList.tsx";
// import AddPokoj from "./components/createPages/AddPokoj.tsx";
// import PacientiLuzkaList from "./components/entityLists/PacientiLuzkaList.tsx";
// import PacientiRezervaceList from "./components/entityLists/PacientiRezervaceList.tsx";
// import AddLuzko from "./components/createPages/AddLuzko.tsx";
// import NavstevyPacientuList from "./components/entityLists/NavstevyPacientuList.tsx";
// import AddNavsteva from "./components/createPages/AddNavsteva.tsx";
// import LogList from "./components/entityLists/LogList.tsx";
// import SystemCatalogList from "./components/entityLists/SystemCatalogList.tsx";

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

const appRoutes = [
    {
        path: "/users",
        element: <UserList />,
    },
    {
        path: "/add-user",
        element: <AddUser />,
    },
    {
        path: "/edit-user/:id",
        element: <AddUser />,
    },
    {
        path: "/pacienti-analyzy",
        element: <PacientiAnalyzyList />,
    },
    {
        path: "/add-pacient-analyza",
        element: <AddPacientAnalyza />,
    },
    {
        path: "/edit-pacient-analyza/:id",
        element: <AddPacientAnalyza />,
    },
    {
        path: "/pacienti-karty",
        element: <PacientiKartyList />,
    },
    {
        path: "/add-pacient-karta",
        element: <AddPacientKarta />,
    },
    {
        path: "/edit-pacient-karta/:id",
        element: <AddPacientKarta />,
    },
    {
        path: "/pacienti-adresy",
        element: <PacientiAdresyList />,
    },
    {
        path: "/add-pacient-adresa",
        element: <AddPacientAdresa />,
    },
    {
        path: "/edit-pacient-adresa/:id",
        element: <AddPacientAdresa />,
    },
    {
        path: "/zamestnanci-data",
        element: <ZamestnanciDataList />,
    },
    {
        path: "/add-zamestnanec",
        element: <AddZamestnanecData />,
    },
    {
        path: "/edit-zamestnanec/:id",
        element: <AddZamestnanecData />,
    },
    {
        path: "/pokoje-data",
        element: <PokojeDataList />,
    },
    {
        path: "/add-pokoj",
        element: <AddPokoj />,
    },
    {
        path: "/edit-pokoj/:id",
        element: <AddPokoj />,
    },
    {
        path: "/luzka/:id",
        element: <PacientiLuzkaList />,
    },
    {
        path: "/luzka/:id/rezervace-luzka/:id",
        element: <PacientiRezervaceList />,
    },
    {
        path: "/add-luzko/:id",
        element: <AddLuzko />,
    },
    {
        path: "/navstevy-pacientu",
        element: <NavstevyPacientuList />,
    },
    {
        path: "/add-navsteva",
        element: <AddNavsteva />,
    },
    {
        path: "/logs",
        element: <LogList />,
    },
    {
        path: "/catalog",
        element: <SystemCatalogList />,
    },
];

export default appRoutes;
