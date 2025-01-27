import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioProductoImagenComponent } from '../formulario-producto-imagen/formulario-producto-imagen.component';
import { EdicionRegistroComponent } from '../../../componentes/edicion-registro/edicion-registro.component';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-editarproductosimagen',
  imports: [EdicionRegistroComponent,HeaderComponent],
  templateUrl: './editarproductosimagen.component.html',
  styles: ``,
})
export class EditarproductosimagenComponent {
  @Input({ transform: numberAttribute })
  id!: number;
  formularioproductosimagen = FormularioProductoImagenComponent;
}
