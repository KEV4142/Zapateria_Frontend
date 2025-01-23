import { Component, Input, numberAttribute } from '@angular/core';
import { EdicionRegistroComponent } from '../../../componentes/edicion-registro/edicion-registro.component';
import { HeaderComponent } from '../../../header/header.component';
import { FormularioCategoriaComponent } from '../formulario-categoria/formulario-categoria.component';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [EdicionRegistroComponent,HeaderComponent],
  templateUrl: './editar-categorias.component.html',
  styles: ``
})
export class EditarCategoriasComponent {
  @Input({transform: numberAttribute})
    id!: number;
    formularioCategorias = FormularioCategoriaComponent;
}
