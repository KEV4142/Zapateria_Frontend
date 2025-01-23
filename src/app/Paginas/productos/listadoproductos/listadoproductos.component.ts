import { Component } from '@angular/core';
import { ListadoGeneralComponent } from '../../../componentes/listado-general/listado-general.component';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-listadoproductos',
  imports: [ListadoGeneralComponent,HeaderComponent],
  templateUrl: './listadoproductos.component.html',
  styles: ``
})
export class ListadoproductosComponent {
  columnas = ['productoid','descripcion', 'precio','categoriaid','imagenid','estado', 'acciones'];
}
