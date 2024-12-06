import { Routes } from '@angular/router';
import { CrearPerroComponent } from './components/crear-perro/crear-perro.component';
import { ListarPerrosComponent } from './components/listar-perros/listar-perros.component';
import { FiltrarPorComponent } from './components/filtrar-por/filtrar-por.component';
import { EditarComponent } from './components/editar/editar.component';
import { AdoptadoComponent } from './components/perro-adoptado/perro-adoptado.component';
import { PerroMuertoComponent } from './components/perro-muerto/perro-muerto.component';
import { ComparaPesoComponent } from './components/compara-peso/compara-peso.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignUpComponent } from './components/auth-sign-up/auth-sign-up.component';
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { MyAuthGuard } from './guards/my-auth-guard.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { RoleGuard } from './guards/role-guard/role.guard';


export const routes: Routes = [

  { path: 'listar-perros', component: ListarPerrosComponent, canActivate: [MyAuthGuard] },
  { path: 'crear-perro', component: CrearPerroComponent, canActivate: [MyAuthGuard] },
  { path: 'filtrar-por', component: FiltrarPorComponent, canActivate: [MyAuthGuard] },
  { path: 'editar', component: EditarComponent, canActivate: [MyAuthGuard, RoleGuard] },
  { path: 'adoptado', component: AdoptadoComponent, canActivate: [MyAuthGuard] },
  { path: 'muerto', component: PerroMuertoComponent, canActivate: [MyAuthGuard] },
  { path: 'compara-peso', component: ComparaPesoComponent, canActivate: [MyAuthGuard, RoleGuard] },
  { path: 'grafico', component: GraficoComponent, canActivate: [MyAuthGuard] },
  { path: 'roles', component: RolesTableComponent, canActivate: [MyAuthGuard, RoleGuard] },
  { path: '', redirectTo: '/listar-perros', pathMatch: 'full' },
  { path: 'login', component: AuthLoginComponent  },
  { path: 'register', component: AuthSignUpComponent },
  { path: 'access-denied', component: AccessDeniedComponent },

];
