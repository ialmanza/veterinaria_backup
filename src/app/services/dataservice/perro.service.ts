import { Injectable, computed, inject, signal } from '@angular/core';
import { SupabaseService } from '../../shared/data-acces/supabase.service';
import { BehaviorSubject } from 'rxjs';


export interface PerroDB{
  id: string;
  animalId: string;
  edad: string;
  fechaPrimeraVacuna: string;
  lugarVacunacion: string;
  peso: string;
  origen: string;
  edificio: string;
  box: string;
  estadoMuerto: string;
  estadoAdoptado: string;
  observacion: string;
  editing: boolean;
  hide: boolean;
  pesosGrafico: number[];
  fechasDePesos:string[];
}

export interface PerrosStates {
  perros: PerroDB[];
  loading: boolean;
  error: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class PerrosdbService {
  private _supabaseClient=inject(SupabaseService).supabaseClient
  private perrodbSubject: BehaviorSubject<PerroDB[]> = new BehaviorSubject<PerroDB[]>([])


  private _state = signal<PerrosStates>({
    perros: [],
    loading: false,
    error: false
  });

  //Selectores
  perros = computed(() => this._state().perros);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  constructor( ) {
    this.getAllPerrosDB();
  }

  // getPerros():Observable<PerroDB[]> {
  //   return this.perrodbSubject.asObservable();

  //  }

  async getAllPerrosDB(): Promise<PerroDB[]> {
    try {
      this._state.update(state => ({ ...state, loading: true }));
      const { data } = await this._supabaseClient
        .from('perros')
        .select()
        .returns<PerroDB[]>();

      if (data && data.length > 0) {
        this._state.update(state => ({ ...state, perros: data }));
        return data; // Retorna los datos obtenidos
      }

      return []; // Retorna un array vacío si no hay datos
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
      return []; // Retorna un array vacío en caso de error
    } finally {
      this._state.update(state => ({ ...state, loading: false }));
    }
  }


  async insertarPerroDB( perroDB: {animalId: string, edad: string, fechaPrimeraVacuna: string, lugarVacunacion: string, peso: string, origen: string,
                         edificio: string, box: string, observacion: string}) {

    try {
      const response = await this._supabaseClient.from('perros').insert({
        animalId: perroDB.animalId,
        edad: perroDB.edad,
        fechaPrimeraVacuna: perroDB.fechaPrimeraVacuna,
        lugarVacunacion: perroDB.lugarVacunacion,
        peso: perroDB.peso,
        origen: perroDB.origen,
        edificio: perroDB.edificio,
        box: perroDB.box,
        estadoMuerto: 'No',
        estadoAdoptado: 'No',
        observacion: perroDB.observacion,
        editing: false,
        hide: false,
        pesosGrafico: [],
        fechasDePesos: [],

      });
      this.getAllPerrosDB();
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }

  }

  async editarPerroDB(perroDB: PerroDB, id: string) {
    try {
      const response = await this._supabaseClient.from('perros').update({
        ...perroDB
      }).eq('id', perroDB.id);
      this.getAllPerrosDB();
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }
  }

   async eliminarPerroDb(id: string) {
    try {
      const response = await this._supabaseClient.from('perros').delete().eq('id', id);
      this.getAllPerrosDB();
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }
  }

  async getFilteredData(colunma: string, value: string) {
    const { data, error } = await this._supabaseClient
      .from('perros')
      .select('*')
      .eq(colunma, value); // Ajusta el filtro según tus necesidades

    if (error) {
      return [];
    }

    return data;
  }


  async getTodasLasFechas(id: string): Promise<string[]> {
    const { data, error } = await this._supabaseClient
      .from('perros')
      .select('fechasDePesos')
      .eq('id', id);

    if (error) {
      return [];
    }

    if (data && data.length > 0) {
      const fechasDePesos = data[0].fechasDePesos;
      if (Array.isArray(fechasDePesos)) {
        return fechasDePesos
      }
    }

    return [];
  }

  async getTodosLosPesos(id: string): Promise<number[]> {
    const { data, error } = await this._supabaseClient
    .from('perros')
    .select('pesosGrafico')
    .eq('id', id);

  if (error) {
    return [];
  }

  if (data && data.length > 0) {
    const pesosGrafico = data[0].pesosGrafico;
    if (Array.isArray(pesosGrafico)) {
      return pesosGrafico.map(peso => parseFloat(peso));
    }
  }

  return [];
  }


  async addPesoYFechaAlPerro(id: string, peso: string, fecha: string) {
    try {

      // Verificar si el perro existe y obtener los arreglos pesosGrafico y fechasDePesos
      const { data, error } = await this._supabaseClient
        .from('perros')
        .select('pesosGrafico, fechasDePesos')
        .eq('id', id)
        .single(); // Asegura que solo un resultado sea devuelto

      if (error) {
        throw error;
      }

      if (data) {
        // El perro existe, obtener los arreglos de pesosGrafico y fechasDePesos
        const pesosGrafico = data.pesosGrafico || [];
        const fechasDePesos = data.fechasDePesos || [];

        // Agregar el nuevo peso y la nueva fecha a los arreglos
        pesosGrafico.push(peso);
        fechasDePesos.push(fecha);

        // Actualizar el registro en la base de datos con los nuevos arreglos
        const { error: updateError } = await this._supabaseClient
          .from('perros')
          .update({ pesosGrafico, fechasDePesos })
          .eq('id', id);

        if (updateError) {
          throw updateError;
        }
      }
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
    }
  }

}
