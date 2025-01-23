import { Component } from '@angular/core';
import { ListadoGeneralComponent } from '../../../componentes/listado-general/listado-general.component';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-listado-categorias',
  imports: [ListadoGeneralComponent,HeaderComponent],
  templateUrl: './listado-categorias.component.html',
  styles: ``
})
export class ListadoCategoriasComponent {
  columnas = ['categoriaid','descripcion', 'estado', 'acciones'];
}
