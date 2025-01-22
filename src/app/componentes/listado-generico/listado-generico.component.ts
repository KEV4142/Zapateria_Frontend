import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listado-generico',
  imports: [],
  templateUrl: './listado-generico.component.html',
  styles: ``
})
export class ListadoGenericoComponent {
  @Input({ required: true })
  listado: any;
}
