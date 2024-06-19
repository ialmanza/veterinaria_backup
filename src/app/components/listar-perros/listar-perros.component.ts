import { Component, inject } from '@angular/core';
import { PerroComponent } from '../perro/perro.component';
import { PerroService } from '../../services/perro.service';
import { Perro } from '../../models/Perro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-perro/ventana-modal-editar-perro.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal-eliminar-perro/ventana-modal-eliminar-perro.component';


@Component({
  selector: 'app-listar-perros',
  standalone: true,
  imports: [ PerroComponent, CommonModule, FormsModule, FilterPipe, DialogContentEditExampleDialog, DialogAnimationsExampleDialog],
  templateUrl: './listar-perros.component.html',
  styleUrl: './listar-perros.component.css'
})
export class ListarPerrosComponent{

  perros: Perro[] = [];
  filteredPerros: Perro[] = [];
  searchTerm: string = '';
  displayedPerros: Perro[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;

  private _perrosService = inject(PerroService);

  constructor(private perroService: PerroService, private dialog: MatDialog) {}


  ngOnInit() {
    this.perroService.getPerros().subscribe((perros: Perro[]) => {
      this.perros = perros;
      this.filteredPerros = perros;
      this.totalItems = perros.length;
      this.updateDisplayedPerros();
    });
  }


  filter(query: string) {
    this.filteredPerros = this.perros.filter(perro =>
      perro.animalID.toLowerCase().includes(query.toLowerCase())
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

}
