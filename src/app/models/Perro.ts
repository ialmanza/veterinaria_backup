export interface Perro {
  id: string;
  origen: string;
  animalID: string;
  edad: string;
  peso: string;
  fechaprimeravacuna: string;
  lugarDeVacunacion: string;
  observaciones: string;
  editing: boolean;
  hide: boolean;
  adoptado: boolean;
  muerto: boolean;
  edificio: string;
  box: string;
  estadoAdopcion: string;
  estadoMuerto: string;
  pesosGrafico: number[];
  fechaDePeso:string[];
}
