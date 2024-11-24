import {Component, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Perro } from '../../models/Perro';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-ventana-modal-editar-perro',
  standalone: true,
  imports: [ CommonModule, FormsModule,MatFormField,MatButtonModule,MatDialogModule,ReactiveFormsModule],
  templateUrl: './ventana-modal-editar-perro.component.html',
  styleUrl: './ventana-modal-editar-perro.component.css'
})
export class VentanaModalEditarPerroComponent {

  constructor(public dialog: MatDialog) {}
  openEditDialog(perro: Perro) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: perro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  }

  @Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'editar-perro.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, MatFormField, ReactiveFormsModule],
  })
  export class DialogContentEditExampleDialog {

    @Input() perros: Perro | undefined;
    editing: any;
    constructor (@Inject(MAT_DIALOG_DATA) public data: Perro, public dialogRef: MatDialogRef<DialogContentEditExampleDialog>) {

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

        console.log('Perro actualizado:', this.perros); // Agregado para debug
      }
      this.toggleEdit(); // Desactiva la edición después de guardar
    }
  }
