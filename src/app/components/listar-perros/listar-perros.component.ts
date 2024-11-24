import { Component, inject, AfterViewInit } from '@angular/core';
import { PerroComponent } from '../perro/perro.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-perro/ventana-modal-editar-perro.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal-eliminar-perro/ventana-modal-eliminar-perro.component';
import { PerrosdbService } from '../../services/dataservice/perro.service';
import { PerroDB } from '../../services/dataservice/perro.service';

@Component({
  selector: 'app-listar-perros',
  standalone: true,
  imports: [ PerroComponent, CommonModule, FormsModule, FilterPipe, DialogContentEditExampleDialog, DialogAnimationsExampleDialog],
  providers: [ PerrosdbService],
  templateUrl: './listar-perros.component.html',
  styleUrl: './listar-perros.component.css'
})
export class ListarPerrosComponent implements AfterViewInit {

  perros: PerroDB[] = [];
  filteredPerros: PerroDB[] = [];
  searchTerm: string = '';
  displayedPerros: PerroDB[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;


  perrosDBService = inject(PerrosdbService);

  constructor( private dialog: MatDialog) {}


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
