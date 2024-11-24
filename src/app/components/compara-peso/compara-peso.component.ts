import { Component, CUSTOM_ELEMENTS_SCHEMA,AfterViewInit, ViewChild, ElementRef, OnInit, inject} from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GraficoComponent } from '../grafico/grafico.component';
import { FormsModule } from '@angular/forms';
import { PerrosdbService,PerroDB } from '../../services/dataservice/perro.service';


@Component({
  selector: 'app-compara-peso',
  standalone: true,
  imports: [ GraficoComponent, FormsModule],
  templateUrl: './compara-peso.component.html',
  styleUrl: './compara-peso.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class ComparaPesoComponent implements AfterViewInit, OnInit {
  perros: PerroDB[] = [];
  id_perro: string = "";

  perroSeleccionado: PerroDB | undefined;
  datagrafico: any = {
    fecha: '',
    peso: '',
  };

  perrosFechas: [] = [];
  perrosPesos:[] = [];
  perrosDBService = inject(PerrosdbService);

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

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

  constructor() {
  }

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



  async añadirPesoYFechaDB(nuevoPeso: string) {
    try {
      let filtered = this.perros;
      if (this.id_perro) {
        filtered = filtered.filter(perro => perro.animalId === this.id_perro);
      }

      if (filtered.length > 0) {
        const perro = filtered[0];
        await this.perrosDBService.addPesoYFechaAlPerro(perro.id, nuevoPeso, this.datagrafico.fecha);

      } else {
        console.error('No se encontró el perro con el ID proporcionado');
      }
    } catch (error) {
      console.error('Error al añadir peso al perro:', error);
    }
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

  onSubmit() {
    this.añadirPesoYFechaDB(this.datagrafico.peso);
    this.mostrarDataGrafico();
  }


}

