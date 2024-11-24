import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Perro } from '../../models/Perro';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-perro/ventana-modal-editar-perro.component';
import { DialogAnimationsExampleDialog } from '../ventana-modal-eliminar-perro/ventana-modal-eliminar-perro.component';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { PerrosdbService, PerroDB } from '../../services/dataservice/perro.service';
@Component({
  selector: 'app-adoptado',
  standalone: true,
  imports: [ FormsModule, DialogContentEditExampleDialog, DialogAnimationsExampleDialog, CommonModule],
  templateUrl: './perro-adoptado.component.html',
  styleUrl: './perro-adoptado.component.css'
})
export class AdoptadoComponent {
  perros: PerroDB[] = [];
  filteredPerros: PerroDB[] = [];
  searchTerm: string = 'Si';
  displayedPerros: PerroDB[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;
  perrosDBService = inject(PerrosdbService);

  constructor( public dialog: MatDialog) {}


  ngOnInit() {
    this.perrosDBService.getAllPerrosDB().then((perros: PerroDB[]) => {
      this.perros = perros;
      this.filter(this.searchTerm);
    }).catch(error => {
      console.error("Error al obtener los datos:", error);
    });
  }


  filter(query: string) {
    this.filteredPerros = this.perros.filter(perro => {
      const adoptado = perro.estadoAdoptado ? perro.estadoAdoptado.toString().toLowerCase() : '';

      return adoptado.includes(query.toLowerCase()) ;
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

  exportToExcel(): void {
    const filteredData = this.filteredPerros.map(perro => ({
      AnimalId: perro.animalId,
      Origen: perro.origen,
      'Fecha de vacunación': perro.fechaPrimeraVacuna,
      'Lugar de vacunación': perro.lugarVacunacion,
      Edad: perro.edad,
      Peso: perro.peso,
      Edificio: perro.edificio,
      Box: perro.box,
      Observaciones: perro.observacion,
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Perros');
    XLSX.writeFile(wb, 'PerrosAdoptados.xlsx');
  }

}
