import { Routes } from '@angular/router';
import { CrearPerroComponent } from './components/crear-perro/crear-perro.component';
import { ListarPerrosComponent } from './components/listar-perros/listar-perros.component';
import { FiltrarPorComponent } from './components/filtrar-por/filtrar-por.component';
import { EditarComponent } from './components/editar/editar.component';
import { AdoptadoComponent } from './components/perro-adoptado/perro-adoptado.component';
import { PerroMuertoComponent } from './components/perro-muerto/perro-muerto.component';
import { ComparaPesoComponent } from './components/compara-peso/compara-peso.component';
import { GraficoComponent } from './components/grafico/grafico.component';




export const routes: Routes = [

  { path: 'listar-perros', component: ListarPerrosComponent },
  { path: 'crear-perro', component: CrearPerroComponent },
  { path: 'filtrar-por', component: FiltrarPorComponent },
  { path: 'editar', component: EditarComponent },
  { path: 'adoptado', component: AdoptadoComponent },
  { path: 'muerto', component: PerroMuertoComponent },
  { path: 'compara-peso', component: ComparaPesoComponent },
  { path: 'grafico', component: GraficoComponent },
  { path: '', redirectTo: '/listar-perros', pathMatch: 'full' },

];
