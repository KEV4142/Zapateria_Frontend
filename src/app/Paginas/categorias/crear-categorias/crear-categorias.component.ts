import { Component } from '@angular/core';
import { FormularioCategoriaComponent } from '../formulario-categoria/formulario-categoria.component';
import { CreacionRegistroComponent } from '../../../componentes/creacion-registro/creacion-registro.component';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-crear-categorias',
  standalone: true,
  imports: [CreacionRegistroComponent,HeaderComponent],
  templateUrl: './crear-categorias.component.html',
  styles: ``
})
export class CrearCategoriasComponent {
  formulariocategorias = FormularioCategoriaComponent;
}
