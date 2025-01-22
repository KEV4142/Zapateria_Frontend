import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from '../listado-generico/listado-generico.component';
import { PaginacionDTO } from '../interfaces/modeloPaginacion/paginacion-dto';
import { HeaderService } from '../../header.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { construirQueryParams } from '../../funciones/construirQueryParams';

@Component({
  selector: 'app-listado-general',
  imports: [CommonModule,RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule],
  templateUrl: './listado-general.component.html',
  styles: ``
})
export class ListadoGeneralComponent<TDTO> implements OnInit {
  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaCrear!: string;

  @Input({required: true})
  rutaEditar!: string;

  @Input({required: true})
  rutaBackend!: string;

  @Input({required: true}) 
  columnasAMostrar!: string[];

  paginacion: PaginacionDTO = { PageNumber: 1, PageSize: 5 };
  entidades!: TDTO[];
  cantidadTotalRegistros!: number;

  constructor(private headerService: HeaderService,private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.rutaBackend) {
      console.error('rutaBackend es requerido y no está definido.');
      return;
    }
    this.cargarRegistros();
  }
  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { PageNumber: datos.pageIndex + 1, PageSize: datos.pageSize };
    this.cargarRegistros();

  }
  borrar(id: number) {
    const headers = this.headerService.getHeaders();
    this.http.put<TDTO>(environment.apiUrl+this.rutaBackend+'/estado/'+id , {
      "estado": "b"
    }, { headers }).subscribe(() => {
      this.cargarRegistros();
    })
  }
  primeraLetraEnMayuscula(valor: string){
    if (!valor) return valor;
    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }
  cargarRegistros() {
    let queryParams = construirQueryParams(this.paginacion);
    this.http.get<
    { 
      currentPage: number; 
      totalPages: number; 
      pageSize: number; 
      totalCount: number; 
      items: TDTO[] 
    }
    >(environment.apiUrl+this.rutaBackend+'/paginacion', {headers: this.headerService.getHeaders(), params: queryParams}).subscribe((respuesta) => {
      this.entidades = respuesta.items;
      this.cantidadTotalRegistros = respuesta.totalCount;
    });
  }
}
