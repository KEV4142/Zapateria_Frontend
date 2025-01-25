import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { extraerErroresFormulario } from '../../funciones/extraerErrores';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edicion-registro',
  imports: [MostrarErroresComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './edicion-registro.component.html',
  styles: ``
})
export class EdicionRegistroComponent<TDTO, TCreacionDTO> implements OnInit{
  constructor(private http: HttpClient,private router: Router,private snackBar: MatSnackBar ) {}
  
  ngOnInit(): void {
    this.http.get(environment.apiUrl+this.rutaListado+'/'+this.id).subscribe(entidad => {
      this.cargarComponente(entidad);
    })
  }
  cargarComponente(entidad: any){
    if (this.contenedorFormulario){
      this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
      this.componentRef.instance.modelo = entidad;
      this.componentRef.instance.modoEdicion = true;
      this.componentRef.instance.posteoFormulario.subscribe((entidad: any) => {
        this.guardarCambios(entidad);
      })

      this.cargando = false;
    }
  }
  @Input()
  id!: number;

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaListado!: string;

  @Input({required: true})
  formulario: any;

  errores: string = '';

  cargando: boolean = true;

  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;
  guardarCambios(entidad: TCreacionDTO) {
    this.cargando = true;
    this.http.put<TDTO>(environment.apiUrl+this.rutaListado+'/'+this.id , entidad).subscribe({
          next: (response) => {
            this.cargando = false;
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            setTimeout(() => {
              this.router.navigate(['/' + this.rutaListado]);
            }, 1000);
      },
      error: err => {
        this.cargando = false;
        const errores = extraerErroresFormulario(err);
        this.errores = errores;
        setTimeout(() => {
          this.errores = '';
        }, 5000);
      }
    });
  }
}
