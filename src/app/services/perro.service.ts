import { Injectable } from '@angular/core';
import { Perro } from '../models/Perro';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerroService {
  private perroSubject: BehaviorSubject<Perro[]> = new BehaviorSubject<Perro[]>([])

  constructor( ) {
    this.loadPerrosFromLocalStorage();
  }

  getPerros():Observable<Perro[]> {
    return this.perroSubject.asObservable();

   }

   addPerro(perro: Perro) {
    const storedPerros = this.getPerrosFromLocalStorage();
    storedPerros.push(perro);
    this.savePerrosToLocalStorage(storedPerros);
    this.perroSubject.next(storedPerros);
   }

   deletePerro(id: string) {
    let storedPerros = this.getPerrosFromLocalStorage();
    storedPerros = storedPerros.filter((perro: { id: string; }) => perro.id !== id);
    this.savePerrosToLocalStorage(storedPerros);
    this.perroSubject.next(storedPerros);
   }

   updatePerro(updatedPerro: Perro) {
    let storedPerros = this.getPerrosFromLocalStorage();
    const index = storedPerros.findIndex(perro => perro.id === updatedPerro.id);
    if (index !== -1) {
      storedPerros[index] = updatedPerro;
        this.savePerrosToLocalStorage(storedPerros);
        this.perroSubject.next(storedPerros);
    } else {
        console.error('Dog not found in local storage.');
    }
   }

   private loadPerrosFromLocalStorage() {
    const storedPerros = this.getPerrosFromLocalStorage();
    this.perroSubject.next(storedPerros);
  }

  private getPerrosFromLocalStorage(): Perro[] {
    if (localStorage.getItem('perros') === null) {
      // alert('No hay perros en la base de datos. Por favor añada uno nuevo.');
      return [];
    }
    const storedPerros = localStorage.getItem('perros');
    return storedPerros ? JSON.parse(storedPerros) : [];

  }

  private savePerrosToLocalStorage(perro: Perro[]) {
    localStorage.setItem('perros', JSON.stringify(perro));
  }

  getId(id:any){
    let storedPerros = this.getPerrosFromLocalStorage();
    if (storedPerros.some((perro: { id: string; }) => perro.id === id)) {
      return id;
    } else {
      return  "No existe el perro";
    }
  }


  getTodosLosPesos(id: string): number[] {
    const storedPerros = this.getPerrosFromLocalStorage();
    const perro = storedPerros.find(p => p.id === id);
    return perro ? perro.pesosGrafico : [];
  }

  //EN PROCESO TODAVIA
  getUltimoPeso(id: string):number{
    const storedPerros = this.getPerrosFromLocalStorage();
    const perro = storedPerros.find(p => p.id === id);

    return perro ? perro.pesosGrafico[perro.pesosGrafico.length - 1] : 0;
  }


  getTodasLasFechas(id: string): string[] {
    const storedPerros = this.getPerrosFromLocalStorage();
    const perro = storedPerros.find(p => p.id === id);
    return perro ? perro.fechaDePeso : [];
  }

  addPesoAlPerro(id:any, peso:any){
    let storedPerros = this.getPerrosFromLocalStorage();
    if (storedPerros.some((perro: { id: string; }) => perro.id === id)) {
      storedPerros.filter((perro: { id: string; }) => perro.id === id)[0].pesosGrafico.push(peso);
      this.savePerrosToLocalStorage(storedPerros);
      this.perroSubject.next(storedPerros);
    } else {
      console.error('Dog not found in local storage.');
    }
  }

  addFechaAlPerro(id:any, fecha:any){
    let storedPerros = this.getPerrosFromLocalStorage();
    if (storedPerros.some((perro: { id: string; }) => perro.id === id)) {
      storedPerros.filter((perro: { id: string; }) => perro.id === id)[0].fechaDePeso.push(fecha);
      this.savePerrosToLocalStorage(storedPerros);
      this.perroSubject.next(storedPerros);
    } else {
      console.error('Dog not found in local storage.');
    }
  }
}
