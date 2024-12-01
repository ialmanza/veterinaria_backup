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


}
