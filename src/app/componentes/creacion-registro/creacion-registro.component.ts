import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { extraerErroresFormulario } from '../../funciones/extraerErrores';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creacion-registro',
  imports: [MostrarErroresComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './creacion-registro.component.html',
  styles: ``,
})
export class CreacionRegistroComponent<TDTO, TCreacionDTO>
  implements AfterViewInit
{
  cargando: boolean = false;
  private componentRef!: ComponentRef<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngAfterViewInit(): void {
    this.componentRef = this.contenedorFormulario.createComponent(
      this.formulario
    );
    this.componentRef.instance.posteoFormulario.subscribe((entidad: any) => {
      this.guardarCambios(entidad);
    });
  }

  @Input({ required: true })
  titulo!: string;

  @Input({ required: true })
  rutaListado!: string;

  @Input({ required: true })
  formulario: any;

  errores: string = '';

  @ViewChild('contenedorFormulario', { read: ViewContainerRef })
  contenedorFormulario!: ViewContainerRef;

  guardarCambios(entidad: FormData | TCreacionDTO) {
    this.cargando = true;
    this.http
      .post<TDTO>(environment.apiUrl + this.rutaListado + '/registro', entidad)
      .subscribe({
        next: (response) => {
          this.cargando = false;
          this.snackBar.open('Registro guardado exitosamente', 'Cerrar', {
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          setTimeout(() => {
            this.router.navigate(['/' + this.rutaListado]);
          }, 1000);
          
        },
        error: (err) => {
          this.cargando = false;
          const errores = extraerErroresFormulario(err);
          this.errores = errores;
          setTimeout(() => {
            this.errores = '';
          }, 5000);
        },
      });
  }
}
