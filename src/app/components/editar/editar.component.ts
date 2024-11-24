import { Component,AfterViewInit, inject, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal-eliminar-perro/ventana-modal-eliminar-perro.component';
import { CommonModule } from '@angular/common';
import { PerrosdbService, PerroDB } from '../../services/dataservice/perro.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  perros: PerroDB[] = [];
  filteredPerros: PerroDB[] = [];
  searchTerm: string = '';
  displayedPerros: PerroDB[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;
  perrosDBService = inject(PerrosdbService);

  constructor(public dialog: MatDialog) {}


  ngOnInit() {
    this.perrosDBService.getAllPerrosDB().then((perros: PerroDB[]) => {
      this.perros = perros;
      this.filteredPerros = perros;
      this.totalItems = perros.length;
      this.updateDisplayedPerros();
    });
  }

  ngAfterViewInit(): void {
    this.perrosDBService.getAllPerrosDB();
    this.perrosDBService.getAllPerrosDB().then(data => {
      this.perros = data;
      this.filteredPerros = data;
      this.displayedPerros = data;
      this.totalItems = data.length;
      this.updateDisplayedPerros();
    }).catch(error => {
      console.error("Error al obtener los datos:", error);
    });

  }

  openEditDialog(perro: PerroDB) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: perro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.perrosDBService.editarPerroDB(perro, perro.id);
      }
    });
  }

  deletePerro(perro: PerroDB) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: perro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.perrosDBService.eliminarPerroDb(perro.id);
      }
    });
  }

  filter(query: string) {
    this.filteredPerros = this.perros.filter(perro => {
      const animalId = perro.animalId ? perro.animalId.toString().toLowerCase() : '';
      const origen = perro.origen ? perro.origen.toString().toLowerCase() : '';
      const box = perro.box ? perro.box.toString().toLowerCase() : '';
      const edificio = perro.edificio ? perro.edificio.toString().toLowerCase() : '';
      const lugarDeVacunacion = perro.lugarVacunacion ? perro.lugarVacunacion.toString().toLowerCase() : '';
      const fecha = perro.fechaPrimeraVacuna ? perro.fechaPrimeraVacuna.toString().toLowerCase() : '';

      return animalId.includes(query.toLowerCase()) || origen.includes(query.toLowerCase()) ||
         box.includes(query.toLowerCase()) || edificio.includes(query.toLowerCase()) || lugarDeVacunacion.includes(query.toLowerCase()) ||
         fecha.includes(query.toLowerCase());
  });
    this.totalItems = this.filteredPerros.length;
    this.currentPage = 0;
    this.updateDisplayedPerros();
  }

  updateDisplayedPerros() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedPerros = this.filteredPerros.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.updateDisplayedPerros();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedPerros();
  }

  nextPage() {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
      this.updateDisplayedPerros();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedPerros();
    }
  }


}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'editar-perro.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, MatFormField, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


class DialogContentEditExampleDialog implements OnInit {

  @Input() perros: PerroDB | undefined;
  editing: any;
  boxes107 = ['B08','B10', 'B11','B12', 'B13'];
  boxes108 = ['B01', 'B02', 'B03', 'B04'];

  form: FormGroup = new FormGroup({
    edificio: new FormControl(''),
    box: new FormControl('')
  });

  constructor (@Inject(MAT_DIALOG_DATA) public data: PerroDB, public dialogRef: MatDialogRef<DialogContentEditExampleDialog>, private perrosService: PerrosdbService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      edificio: new FormControl(this.data.edificio),
      box: new FormControl(this.data.box)
    });
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  toggleEdit() {
    this.editing = !this.editing;
    console.log(`Editing: ${this.editing}`); // Agregado para debug
  }

  saveChanges() {
    if (this.perros) {
      this.perrosService.editarPerroDB(this.perros, this.perros.id);
      console.log('Perro actualizado:', this.perros); // Agregado para debug
    }
    this.toggleEdit(); // Desactiva la edición después de guardar
  }
}
