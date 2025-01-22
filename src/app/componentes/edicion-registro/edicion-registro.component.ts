import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CargandoComponent } from '../cargando/cargando.component';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { HeaderService } from '../../header.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { extraerErroresFormulario } from '../../funciones/extraerErrores';

@Component({
  selector: 'app-edicion-registro',
  imports: [CargandoComponent,MostrarErroresComponent],
  templateUrl: './edicion-registro.component.html',
  styles: ``
})
export class EdicionRegistroComponent<TDTO, TCreacionDTO> implements OnInit{
  constructor(private headerService: HeaderService,private http: HttpClient,private router: Router ) {}
  
  ngOnInit(): void {
    const headers = this.headerService.getHeaders();
    this.http.get(environment.apiUrl+this.rutaListado+'/'+this.id, { headers }).subscribe(entidad => {
      this.cargarComponente(entidad);
    })
  }
  cargarComponente(entidad: any){
    if (this.contenedorFormulario){
      this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
      this.componentRef.instance.modelo = entidad;
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

  cargando = true;

  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;
  guardarCambios(entidad: TCreacionDTO) {
    const headers = this.headerService.getHeaders();
    this.http.put<TDTO>(environment.apiUrl+this.rutaListado+'/'+this.id , entidad, { headers }).subscribe({
          next: (response) => {
        this.router.navigate(['/'+this.rutaListado]);
      },
      error: err => {
        const errores = extraerErroresFormulario(err);
        this.errores = errores;
        setTimeout(() => {
          this.errores = '';
        }, 5000);
      }
    });
  }
}
