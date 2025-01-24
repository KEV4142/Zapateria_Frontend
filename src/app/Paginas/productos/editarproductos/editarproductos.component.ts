import { Component, Input, numberAttribute } from '@angular/core';
import { EdicionRegistroComponent } from '../../../componentes/edicion-registro/edicion-registro.component';
import { HeaderComponent } from '../../../header/header.component';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';

@Component({
  selector: 'app-editarproductos',
  standalone: true,
  imports: [EdicionRegistroComponent,HeaderComponent],
  templateUrl: './editarproductos.component.html',
  styles: ``
})
export class EditarproductosComponent {
  @Input({transform: numberAttribute})
    id!: number;
    formularioproductos = FormularioProductoComponent;
}
