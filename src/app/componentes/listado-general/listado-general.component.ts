import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from '../listado-generico/listado-generico.component';
import { PaginacionDTO } from '../interfaces/modeloPaginacion/paginacion-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { construirQueryParams } from '../../funciones/construirQueryParams';
import { MatDialog } from '@angular/material/dialog';
import { CuadroConfirmacionComponent } from '../cuadro-confirmacion/cuadro-confirmacion.component';

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

  constructor(private dialog: MatDialog,private http: HttpClient) {}

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
  openConfirmDialog(id:number) {
    const dialogRef = this.dialog.open(CuadroConfirmacionComponent, {
      width: '400px',
      data: {
        title: 'Confirmación',
        text: '¿Deseas bloquear este registro?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.borrar(id);
      }
    });
  }
  borrar(id: number) {
    this.http.put<TDTO>(environment.apiUrl+this.rutaBackend+'/estado/'+id , {
      "estado": "b"
    }).subscribe(() => {
      this.cargarRegistros();
    })
  }
  primeraLetraEnMayuscula(valor: any): string{
    if (!valor || typeof valor !== 'string') return valor;
    let resultado=valor.toLowerCase();
    return resultado.charAt(0).toUpperCase() + resultado.slice(1);
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
    >(environment.apiUrl+this.rutaBackend+'/paginacion', { params: queryParams}).subscribe((respuesta) => {
      this.entidades = respuesta.items;
      this.cantidadTotalRegistros = respuesta.totalCount;
    });
    
  }
}
