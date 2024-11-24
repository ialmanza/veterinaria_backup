import { Component, Input } from '@angular/core';
import { Perro } from '../../models/Perro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perro',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './perro.component.html',
  styleUrl: './perro.component.css'
})
export class PerroComponent {
  @Input() perros!: Perro
  editing: boolean = false;

  constructor() {
  }


}
