import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Perro } from '../../models/Perro';


@Component({
  selector: 'app-ventana-modal-eliminar-perro',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './ventana-modal-eliminar-perro.component.html',
  styleUrl: './ventana-modal-eliminar-perro.component.css'
})
export class VentanaModalEliminarPerroComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './eliminar-perro.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: Perro) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
