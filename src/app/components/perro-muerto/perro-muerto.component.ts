import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerroService } from '../../services/perro.service';
import { MatDialog } from '@angular/material/dialog';
import { Perro } from '../../models/Perro';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-perro/ventana-modal-editar-perro.component';
import { DialogAnimationsExampleDialog } from '../ventana-modal-eliminar-perro/ventana-modal-eliminar-perro.component';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-perro-muerto',
  standalone: true,
  imports: [ CommonModule, FormsModule, DialogContentEditExampleDialog, DialogAnimationsExampleDialog],
  templateUrl: './perro-muerto.component.html',
  styleUrl: './perro-muerto.component.css'
})
export class PerroMuertoComponent {
  perros: Perro[] = [];
  filteredPerros: Perro[] = [];
  searchTerm: string = 'Si';
  displayedPerros: Perro[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;

  constructor(private perroService: PerroService, public dialog: MatDialog) {}


  ngOnInit() {
    this.perroService.getPerros().subscribe((perros: Perro[]) => {
      this.perros = perros;
      this.filteredPerros = perros;
      this.totalItems = perros.length;
      this.updateDisplayedPerros();
      this.filter();
    });
  }

  openEditDialog(perro: Perro) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: perro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.perroService.updatePerro(perro);
      }
    });
  }

  deletePerro(perro: Perro) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: perro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.perroService.deletePerro(perro.id);
      }
    });
  }

  filter() {
    this.filteredPerros = this.perros.filter(perro =>
      perro.estadoMuerto.toLowerCase().includes(this.searchTerm.toLowerCase())


    );
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
    const filteredData = this.filteredPerros.map(perro => {
      const { origen, animalID, observaciones, fechaprimeravacuna, lugarDeVacunacion, edad, peso, edificio, box, ...rest } = perro;
      return {
        Origen: origen,
        AnimalId: animalID,
        'Observaciones': observaciones,
        'Fecha de vacunación': fechaprimeravacuna,
        'Lugar de vacunación': lugarDeVacunacion,
        Edad: edad,
        Peso: peso,
        'Edificio': edificio,
        Box: box,


      };
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Perros');
    XLSX.writeFile(wb, 'Muertos.xlsx');
  }

}
