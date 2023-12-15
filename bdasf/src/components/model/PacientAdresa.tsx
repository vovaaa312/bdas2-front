export interface PacientAdresa {
    idPacient: number;
    jmeno: string;
    prijmeni: string;
    datumHospitalizace: string; // Изменено на строку
    datumNarozeni: string; // Изменено на строку
    cisloTelefonu: number;
    pohlavi: string;

    idAdresa: number;
    zeme: string;
    mesto: string;
    adresa: string;
    psc: number;
}