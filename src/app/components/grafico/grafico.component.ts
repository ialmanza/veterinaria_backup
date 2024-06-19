import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Perro } from '../../models/Perro';
import { PerroService } from '../../services/perro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements AfterViewInit, OnInit {

 @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;
  perros: Perro[] = [];
  id_perro: string = "";
  perroSeleccionado: Perro | undefined;
  perrosFechas: [] = [];
  perrosPesos:[] = [];

  data = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Peso del Perro',
        data: [] as number[],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  constructor(private perroService: PerroService) { }


  ngOnInit(): void {
    this.perroService.getPerros().subscribe(perros => {
      this.perros = perros;
    });
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'line' as ChartType,
      data: this.data
    });
  }

  mostrarDataGrafico(): void {
    const perro = this.perros.find(p => p.animalID === this.id_perro);

    if (perro) {
      this.perroSeleccionado = perro;
      this.data.labels = this.perroService.getTodasLasFechas(this.perroSeleccionado.id);
      this.data.datasets[0].data = this.perroService.getTodosLosPesos(this.perroSeleccionado.id);
      this.chart?.update();

    }
  }



}

