import { Component} from '@angular/core';
import { PerroComponent } from '../perro/perro.component';
import { PerroService } from '../../services/perro.service';
import { Perro } from '../../models/Perro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import * as XLSX from 'xlsx';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-perro/ventana-modal-editar-perro.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal-eliminar-perro/ventana-modal-eliminar-perro.component';

import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

interface FoodNode {
  name: string;
  children?: FoodNode[];
  showMenu?: boolean; // Añadido
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Edificio 1',
    children: [{name: 'Box 1'}, {name: 'Box 2'}, {name: 'Box 3'}],
  },
  {
    name: 'Edificio 2',
    children: [{name: 'Box 4'}, {name: 'Box 5'}, {name: 'Box 6'}],
  },
  {
    name: 'Edificio 3',
    children: [{name: 'Box 7'}, {name: 'Box 8'}, {name: 'Box 9'}],
  },
  {
    name: 'Edificio 4',
    children: [{name: 'Box 10'}, {name: 'Box 11'}, {name: 'Box 12'}],
  }

];

@Component({
  selector: 'app-filtrar-por',
  standalone: true,
  imports: [ CommonModule, FormsModule, PerroComponent, FilterPipe, DialogContentEditExampleDialog, DialogAnimationsExampleDialog, MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './filtrar-por.component.html',
  styleUrl: './filtrar-por.component.css'
})
export class FiltrarPorComponent {
  perros: Perro[] = [];
  filteredPerros: Perro[] = [];
  searchTerm: string = '';
  displayedPerros: Perro[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  showMenu?: boolean = false;


  constructor(private perroService: PerroService, private dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }


  ngOnInit() {
    this.perroService.getPerros().subscribe((perros: Perro[]) => {
      this.perros = perros;
      this.filteredPerros = perros;
      this.totalItems = perros.length;
      this.updateDisplayedPerros();
    });
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  onNodeClick(event: MouseEvent,node: FoodNode) {
    const lastWord = node.name.split(' ').pop();
    if (lastWord) {
      this.search(lastWord);
    }
  }

  search(query: string) {
    this.filteredPerros = this.perros.filter(perro =>
      //perro.animalID.toLowerCase().includes(query.toLowerCase()) ||
      //perro.origen.toLowerCase().includes(query.toLowerCase()) ||
      perro.box.toLowerCase().includes(query.toLowerCase()) /*||
      perro.edificio.toLowerCase().includes(query.toLowerCase())*/
    );
    this.totalItems = this.filteredPerros.length;
    this.currentPage = 0;
    this.updateDisplayedPerros();

  }

  filter(query: string) {
    this.filteredPerros = this.perros.filter(perro =>
      perro.animalID.toLowerCase().includes(query.toLowerCase()) ||
      perro.origen.toLowerCase().includes(query.toLowerCase())

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
    XLSX.writeFile(wb, 'Perros.xlsx');
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

  mostrarTodos() {
    this.filteredPerros = this.perros;
    this.totalItems = this.perros.length;
    this.currentPage = 0;
    this.updateDisplayedPerros();
  }
}

