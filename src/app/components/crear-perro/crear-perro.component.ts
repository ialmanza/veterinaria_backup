import { Component, OnInit } from '@angular/core';
import { ListarPerrosComponent } from '../listar-perros/listar-perros.component';
import { Router } from '@angular/router';
import { PerroService } from '../../services/perro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-perro',
  standalone: true,
  providers: [PerroService],
  imports: [ ListarPerrosComponent, FormsModule ],
  templateUrl: './crear-perro.component.html',
  styleUrl: './crear-perro.component.css'
})
export class CrearPerroComponent {


  perro: any = {
    animalId: '',
    peso: '',
    edificio: '',
  };


  constructor(private perrosService: PerroService, private router: Router) {}

  ngOnInit() {}


  addPerro(edad:HTMLInputElement,fechaPrimeraVacuna:HTMLInputElement,lugarDeVacunacion:HTMLTextAreaElement,origen:HTMLInputElement, box:HTMLInputElement, observaciones:HTMLTextAreaElement) {
    const id = Date.now().toString();
    this.perrosService.addPerro({
      id,
      origen: origen.value,
      animalID: this.perro.animalId,
      edad: edad.value,
      fechaprimeravacuna: fechaPrimeraVacuna.value,
      lugarDeVacunacion: lugarDeVacunacion.value,
      peso: this.perro.peso,
      editing: false,
      hide: false,
      adoptado: false,
      muerto: false,
      observaciones: observaciones.value,
      edificio: this.perro.edificio,
      box: box.value,
      estadoAdopcion: 'No',
      estadoMuerto: 'No',
      pesosGrafico: [],
      fechaDePeso: [],

    });

    origen.value = '';
    edad.value = '';
    fechaPrimeraVacuna.value = '';
    lugarDeVacunacion.value = '';
    observaciones.value = '';
    box.value = '';
    this.router.navigate(['/listar-perros']);
    origen.focus();
    return false;

  }


  onClick() {
    this.router.navigate(['/listar-perros']);
  }

}
