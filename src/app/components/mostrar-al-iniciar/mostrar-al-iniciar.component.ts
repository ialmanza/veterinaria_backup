import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mostrar-al-iniciar',
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule],
  templateUrl: './mostrar-al-iniciar.component.html',
  styleUrl: './mostrar-al-iniciar.component.css'
})


export class DialogContentExample {
  readonly dialog = inject(MatDialog);

  openMostrarDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleMostrarDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'mostrar-al-iniciar.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleMostrarDialog {

  constructor(private router: Router) { }

  onYesClick() {
    this.router.navigate(['/crear-perro']);
  }

}
