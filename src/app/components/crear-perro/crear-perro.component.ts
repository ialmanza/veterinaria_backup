import { Component, inject } from '@angular/core';
import { ListarPerrosComponent } from '../listar-perros/listar-perros.component';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { PerrosdbService } from '../../services/dataservice/perro.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PerroDB } from '../../services/dataservice/perro.service';
import { CommonModule } from '@angular/common';

interface PerroForm {
  animalId: FormControl<string | null>;
  edad: FormControl<string | null>;
  fechaPrimeraVacuna: FormControl<string | null>;
  lugarVacunacion: FormControl<string | null>;
  peso: FormControl<string | null>;
  origen: FormControl<string | null>;
  edificio: FormControl<string | null>;
  box: FormControl<string | null>;
  observacion: FormControl<string | null>;
}

@Component({
  selector: 'app-crear-perro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListarPerrosComponent],
  templateUrl: './crear-perro.component.html',
  styleUrl: './crear-perro.component.css'
})

export class CrearPerroComponent {
  perrosdbService = inject(PerrosdbService);
  perroSelected: PerroDB | null = null
  private _formBuilder = inject(FormBuilder);



  form = this._formBuilder.group<PerroForm>({
    animalId: this._formBuilder.control('', [Validators.required]),
    edad: this._formBuilder.control('', [Validators.required]),
    fechaPrimeraVacuna: this._formBuilder.control('', [Validators.required]),
    lugarVacunacion: this._formBuilder.control('', [Validators.required]),
    peso: this._formBuilder.control('', [Validators.required]),
    origen: this._formBuilder.control('', [Validators.required]),
    edificio: this._formBuilder.control('', [Validators.required]),
    box: this._formBuilder.control('', [Validators.required]),
    observacion: this._formBuilder.control(''),
  });

  boxes107 = ['B08','B10', 'B11','B12', 'B13'];
  boxes108 = ['B01', 'B02', 'B03', 'B04'];
  selectedEdificio = this.form.value.edificio;
  selectedBox = this.form.value.box;

  constructor(private perrosDBService: PerrosdbService, private router: Router) {}

  ngAfterViewInit(): void {
    this.perrosdbService.getAllPerrosDB();

  }

  insertarPerroDB() {
    if (this.form.invalid) {
      return;
    }
    this.perrosdbService.insertarPerroDB({
        animalId: this.form.value.animalId!,
        edad: this.form.value.edad!,
        fechaPrimeraVacuna: this.form.value.fechaPrimeraVacuna!,
        lugarVacunacion: this.form.value.lugarVacunacion!,
        peso: this.form.value.peso!,
        origen: this.form.value.origen!,
        edificio: this.form.value.edificio!,
        box: this.form.value.box!,
        observacion: this.form.value.observacion!,
      });
    this.router.navigate(['/listar-perros']);
  }


  onClick() {
    this.router.navigate(['/listar-perros']);
  }

  insertarPerroDBNuevos() {
    console.log('insertarPerroDBNuevos presionado');
    const perros = [
      { animalId: 'P001', edad: '2' , fechaPrimeraVacuna: '2023-05-15', lugarVacunacion: 'Clínica Canina Central', peso: '20', origen: 'Refugio Los Pinos', edificio: 'A', box: '1', observacion: 'Energético y sociable' },
      { animalId: 'P002', edad: '6' , fechaPrimeraVacuna: '2023-06-10', lugarVacunacion: 'Veterinaria Amigos', peso: '8', origen: 'Callejón Libertad', edificio: 'B', box: '2', observacion: 'Tímido al principio' },
      { animalId: 'P003', edad: '4' , fechaPrimeraVacuna: '2022-04-25', lugarVacunacion: 'VetCare', peso: '25 ', origen: 'Adopción previa', edificio: 'A', box: '3', observacion: 'Muy obediente' },
      { animalId: 'P004', edad: '3' , fechaPrimeraVacuna: '2023-01-15', lugarVacunacion: 'Clínica Canina Sur', peso: '18', origen: 'Rescate urbano', edificio: 'C', box: '4', observacion: 'Le encanta jugar' },
      { animalId: 'P005', edad: '1' , fechaPrimeraVacuna: '2023-07-20', lugarVacunacion: 'Veterinaria Amigos', peso: '12', origen: 'Refugio Santa María', edificio: 'B', box: '5', observacion: 'Tiene miedo a los ruidos fuertes' },
      { animalId: 'P006', edad: '5' , fechaPrimeraVacuna: '2022-08-30', lugarVacunacion: 'Clínica Canina Central', peso: '30', origen: 'Adopción fallida', edificio: 'D', box: '6', observacion: 'Excelente compañero' },
      { animalId: 'P007', edad: '9' , fechaPrimeraVacuna: '2023-09-15', lugarVacunacion: 'VetCare', peso: '10 ', origen: 'Refugio de animales', edificio: 'A', box: '7', observacion: 'Juguetón y curioso' },
      { animalId: 'P008', edad: '7' , fechaPrimeraVacuna: '2021-12-10', lugarVacunacion: 'Clínica Animalia', peso: '22 ', origen: 'Rescate de granja', edificio: 'E', box: '8', observacion: 'Calmado y tranquilo' },
      { animalId: 'P009', edad: '3' , fechaPrimeraVacuna: '2023-10-05', lugarVacunacion: 'Veterinaria Amigos', peso: '6', origen: 'Abandono en parque', edificio: 'B', box: '9', observacion: 'Aún aprendiendo hábitos' },
      { animalId: 'P010', edad: '2' , fechaPrimeraVacuna: '2023-03-17', lugarVacunacion: 'VetCare', peso: '18 ', origen: 'Adopción previa', edificio: 'A', box: '10', observacion: 'Sociable con otros perros' },
      { animalId: 'P011', edad: '3' , fechaPrimeraVacuna: '2022-11-25', lugarVacunacion: 'Clínica Canina Sur', peso: '24 ', origen: 'Rescate de carretera', edificio: 'C', box: '11', observacion: 'Le encanta correr' },
      { animalId: 'P012', edad: '4' , fechaPrimeraVacuna: '2023-10-12', lugarVacunacion: 'Clínica Animalia', peso: '5', origen: 'Callejón Libertad', edificio: 'D', box: '12', observacion: 'Muy juguetón' },
      { animalId: 'P013', edad: '2' , fechaPrimeraVacuna: '2023-06-18', lugarVacunacion: 'Clínica Canina Central', peso: '14 ', origen: 'Refugio Los Pinos', edificio: 'A', box: '13', observacion: 'Aprendiendo comandos básicos' },
      { animalId: 'P014', edad: '1' , fechaPrimeraVacuna: '2023-05-25', lugarVacunacion: 'VetCare', peso: '11 ', origen: 'Rescate de incendio', edificio: 'B', box: '14', observacion: 'Hiperactivo' },
      { animalId: 'P015', edad: '6' , fechaPrimeraVacuna: '2022-09-30', lugarVacunacion: 'Clínica Canina Sur', peso: '28', origen: 'Abandono en zona rural', edificio: 'E', box: '15', observacion: 'Dócil y cariñoso' },
      { animalId: 'P016', edad: '8' , fechaPrimeraVacuna: '2023-08-10', lugarVacunacion: 'Veterinaria Amigos', peso: '9', origen: 'Refugio Santa María', edificio: 'D', box: '16', observacion: 'Necesita entrenamiento' },
      { animalId: 'P017', edad: '4' , fechaPrimeraVacuna: '2022-07-20', lugarVacunacion: 'VetCare', peso: '21 ', origen: 'Adopción previa', edificio: 'A', box: '17', observacion: 'Le encanta nadar' },
      { animalId: 'P018', edad: '3' , fechaPrimeraVacuna: '2023-10-01', lugarVacunacion: 'Clínica Animalia', peso: '4', origen: 'Callejón Libertad', edificio: 'B', box: '18', observacion: 'Juguetón y curioso' },
      { animalId: 'P019', edad: '1' , fechaPrimeraVacuna: '2023-04-15', lugarVacunacion: 'Clínica Canina Sur', peso: '13', origen: 'Rescate urbano', edificio: 'C', box: '19', observacion: 'Cariñoso y amigable' },
      { animalId: 'P020', edad: '7' , fechaPrimeraVacuna: '2021-11-10', lugarVacunacion: 'Clínica Animalia', peso: '23', origen: 'Refugio Los Pinos', edificio: 'D', box: '20', observacion: 'Excelente compañero' },
      { animalId: 'P021', edad: '5' , fechaPrimeraVacuna: '2022-03-25', lugarVacunacion: 'VetCare', peso: '26', origen: 'Adopción fallida', edificio: 'E', box: '21', observacion: 'Calmado y confiado' },
      { animalId: 'P022', edad: '9' , fechaPrimeraVacuna: '2023-09-12', lugarVacunacion: 'Clínica Canina Central', peso: '12', origen: 'Rescate de carretera', edificio: 'A', box: '22', observacion: 'Sociable con niños' },
      { animalId: 'P023', edad: '2' , fechaPrimeraVacuna: '2023-05-20', lugarVacunacion: 'Clínica Animalia', peso: '17', origen: 'Refugio Santa María', edificio: 'B', box: '23', observacion: 'Adora los paseos' },
      { animalId: 'P024', edad: '3' , fechaPrimeraVacuna: '2022-08-10', lugarVacunacion: 'VetCare', peso: '19', origen: 'Abandono en parque', edificio: 'C', box: '24', observacion: 'Activo y saludable' },
      { animalId: 'P025', edad: '6' , fechaPrimeraVacuna: '2023-07-15', lugarVacunacion: 'Clínica Canina Sur', peso: '7', origen: 'Refugio Los Pinos', edificio: 'D', box: '25', observacion: 'Aprendiendo a socializar' },
    ];

    for (let i = 0; i < perros.length; i++) {
      this.perrosdbService.insertarPerroDB(perros[i]);
    }
    console.log('Perros insertados en la base de datos.');
  }

}
