import { Component, inject } from '@angular/core';
import { PerrosdbService, PerroDB } from '../../services/dataservice/perro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-filtrar-por',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './filtrar-por.component.html',
  styleUrl: './filtrar-por.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FiltrarPorComponent {
  perrosDBService = inject(PerrosdbService);
  perros: PerroDB[] = [];
  filteredPerros: PerroDB[] = [];
  searchTerm: string = '';
  selectedEdificio = '';
  selectedBox = '';

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;
  displayedPerros: PerroDB[] = [];

  boxes107 = ['B08','B10', 'B11','B12', 'B13'];
  boxes108 = ['B01', 'B02', 'B03', 'B04'];

  ngAfterViewInit(): void {
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

  filterDB() {
    let filtered = this.perros;
    if (this.selectedEdificio) {
      filtered = filtered.filter(perro => perro.edificio === this.selectedEdificio);
    }
    if (this.selectedBox) {
      filtered = filtered.filter(perro => perro.box === this.selectedBox);
    }
    this.filteredPerros = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 0;
    this.updateDisplayedPerros();
  }



  exportToExcel(): void {
    const filteredData = this.filteredPerros.map(perro => ({
      Origen: perro.origen,
      AnimalId: perro.animalId,
      Observaciones: perro.observacion,
      'Fecha de vacunación': perro.fechaPrimeraVacuna,
      'Lugar de vacunación': perro.lugarVacunacion,
      Edad: perro.edad,
      Peso: perro.peso,
      Edificio: perro.edificio,
      Box: perro.box,
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Perros');
    XLSX.writeFile(wb, `Perros_${this.selectedEdificio}_${this.selectedBox}.xlsx`);
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
