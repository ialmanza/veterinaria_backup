import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { PerrosdbService, PerroDB } from '../../services/dataservice/perro.service';
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
  perros: PerroDB[] = [];
  id_perro: string = "";
  perroSeleccionado: PerroDB | undefined;
  perrosFechas: [] = [];
  perrosPesos:[] = [];
  perrosDBService = inject(PerrosdbService);

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
  constructor() { }

  ngOnInit() {
    this.perrosDBService.getAllPerrosDB().then((perros: PerroDB[]) => {
      this.perros = perros;
    });
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'line' as ChartType,
      data: this.data
    });

  }

  async mostrarDataGrafico() {
    const perro = this.perros.find(p => p.animalId === this.id_perro);

    if (perro) {
      this.perroSeleccionado = perro;
      this.data.labels = await this.perrosDBService.getTodasLasFechas(this.perroSeleccionado.id);
      const pesos = await this.perrosDBService.getTodosLosPesos(this.perroSeleccionado.id);
      this.data.datasets[0].data = pesos;
      this.chart?.update();

    }
  }

}

