import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListadoCategoriasComponent } from './Paginas/categorias/listado-categorias/listado-categorias.component';
import { CrearCategoriasComponent } from './Paginas/categorias/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './Paginas/categorias/editar-categorias/editar-categorias.component';
import { ListadoproductosComponent } from './Paginas/productos/listadoproductos/listadoproductos.component';
import { CrearproductosComponent } from './Paginas/productos/crearproductos/crearproductos.component';
import { EditarproductosComponent } from './Paginas/productos/editarproductos/editarproductos.component';
import { EditarproductosimagenComponent } from './Paginas/productos/editarproductosimagen/editarproductosimagen.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'categorias', component: ListadoCategoriasComponent, canActivate: [AuthGuard] },
  { path: 'categorias/crear', component: CrearCategoriasComponent, canActivate: [AuthGuard] },
  { path: 'categorias/editar/:id', component: EditarCategoriasComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ListadoproductosComponent, canActivate: [AuthGuard] },
  { path: 'productos/crear', component: CrearproductosComponent, canActivate: [AuthGuard] },
  { path: 'productos/editar/:id', component: EditarproductosComponent, canActivate: [AuthGuard] },
  { path: 'productos/editarimagen/:id', component: EditarproductosimagenComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];
