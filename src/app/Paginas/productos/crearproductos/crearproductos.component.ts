import { Component } from '@angular/core';
import { CreacionRegistroComponent } from '../../../componentes/creacion-registro/creacion-registro.component';
import { HeaderComponent } from '../../../header/header.component';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';

@Component({
  selector: 'app-crearproductos',
  standalone: true,
  imports: [CreacionRegistroComponent,HeaderComponent],
  templateUrl: './crearproductos.component.html',
  styles: ``
})
export class CrearproductosComponent {
  formularioproductos = FormularioProductoComponent;
}
