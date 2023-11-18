// В файле, где определен тип Pacient (например, types.ts)

export type Pacient = {
  id: number;
  id_adresa: number;
  jmeno: string;
  prijmeni: string;
  datumHospitalizace: Date;
  datumNarozeni: Date;
  cisloTelefonu: number;
  pohlavi: string;
  // Добавьте остальные поля, если они присутствуют
};
