import { Component, CUSTOM_ELEMENTS_SCHEMA,AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GraficoComponent } from '../grafico/grafico.component';
import { Perro } from '../../models/Perro';
import { PerroService } from '../../services/perro.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-compara-peso',
  standalone: true,
  imports: [ GraficoComponent, FormsModule],
  templateUrl: './compara-peso.component.html',
  styleUrl: './compara-peso.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class ComparaPesoComponent implements AfterViewInit, OnInit {
  perros: Perro[] = [];
  id_perro: string = "";

  perroSeleccionado: Perro | undefined;
  datagrafico: any = {
    fecha: '',
    peso: '',
  };

  perrosFechas: [] = [];
  perrosPesos:[] = [];

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

  constructor(private perroService: PerroService) {
  }

  ngOnInit() {
    this.perroService.getPerros().subscribe((perros: Perro[]) => {
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

  agregarDatos() {
    const perro = this.perros.find(p => p.animalID === this.id_perro);
    if (perro) {
      this.perroSeleccionado = perro;
      this.perroService.addFechaAlPerro(this.perroSeleccionado.id, this.datagrafico.fecha);
      this.perroService.addPesoAlPerro(this.perroSeleccionado.id, this.datagrafico.peso);
      this.mostrarDataGrafico();
    } else {
      console.log("Perro no encontrado");
    }
    this.id_perro = '';
    this.datagrafico = {
      fecha: '',
      peso: '',
    };
  }


  agregarFechas() {
    const perro = this.perros.find(p => p.animalID === this.id_perro);
    if (perro) {
      this.perroSeleccionado = perro;
      this.perroService.addFechaAlPerro(this.perroSeleccionado.id, this.datagrafico.fecha);
      console.log("Fechas agregadas:", this.perroSeleccionado.animalID ,this.perroSeleccionado.fechaDePeso);
    } else {
      console.log("Perro no encontrado");
    }
  }

  agregarPesos() {
    const perro = this.perros.find(p => p.animalID === this.id_perro);
    if (perro) {
      this.perroSeleccionado = perro;
      const ultimoPeso = this.perroService.getUltimoPeso(this.perroSeleccionado.id);
      //  EN PROCESO TODAVIA
      if(ultimoPeso && ultimoPeso < this.datagrafico.peso){
        console.log(ultimoPeso)
          alert("El peso ingresado es menor al anterior")
      }

      this.perroService.addPesoAlPerro(this.perroSeleccionado.id, this.datagrafico.peso);
      console.log("Pesos agregados: ", this.perroSeleccionado.animalID ,this.perroSeleccionado.pesosGrafico);
    } else {
      console.log("Perro no encontrado");
    }
  }

  obtenerPesos(id: any) {
    const perro = this.perros.find(p => p.animalID === id);
    if (perro) {
      this.perroSeleccionado = perro;
      this.perroService.getTodosLosPesos(this.perroSeleccionado.id);
      console.log("Pesos obtenidos: ", this.perroSeleccionado.animalID ,this.perroSeleccionado.pesosGrafico);
    } else {
      console.log("Perro no encontrado");
    }

  }

  obtenerFechas(id: any) {
    const perro = this.perros.find(p => p.animalID === id);
    if (perro) {
      this.perroSeleccionado = perro;
      this.perroService.getTodasLasFechas(this.perroSeleccionado.id);
      console.log("Fechas obtenidas: ", this.perroSeleccionado.animalID ,this.perroSeleccionado.fechaDePeso);
    } else {
      console.log("Perro no encontrado");
    }
  }

  onSubmit() {
    this.agregarDatos();
    this.mostrarDataGrafico();
  }

}

