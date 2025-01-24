import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Opcion, ProductoCreacionDTO, ProductoDTO } from '../producto';
import { Categoria } from '../../categorias/categoria';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './formulario-producto.component.html',
  styles: ``,
})
export class FormularioProductoComponent implements OnInit {
  categorias: Categoria[] = [];
  archivoImagen: File | null = null;
  private formBuilder = inject(FormBuilder);

  opciones: Opcion[] = [
    { name: 'Activo', abr: 'A' },
    { name: 'Bloqueado', abr: 'B' },
    { name: 'Inactivo', abr: 'I' },
  ];

  @Input() modoEdicion: boolean = false;
  @Input() modelo?: ProductoDTO;
  @Output() posteoFormulario = new EventEmitter<FormData | ProductoDTO>();
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategorias();
    if (this.modoEdicion && this.modelo) {
      this.form.patchValue(this.modelo);
      this.form.controls.estado.setValidators([Validators.required]);
      this.form.controls.estado.updateValueAndValidity();
    } else {
      this.form.controls.estado.clearValidators();
      this.form.controls.estado.updateValueAndValidity();
    }
  }

  loadCategorias() {
    this.http
      .get<Categoria[]>(environment.apiUrl + 'categorias/activos')
      .subscribe((data: Categoria[]) => {
        this.categorias = data;
      });
      

  }

  sel: string = '';

  form = this.formBuilder.group({
    descripcion: ['', { validators: [Validators.required] }],
    precio: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    categoriaid: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    estado: [''],
  });

  obtenerErrorCampoDescripcion() {
    let campo = this.form.controls.descripcion;
    if (campo.hasError('required')) {
      return 'El campo Descripcion es requerido.';
    }
    return '';
  }
  obtenerErrorCampoPrecio() {
    let campo = this.form.controls.precio;
    if (campo.hasError('required')) {
      return 'El campo Precio es requerido.';
    }
    if (campo.hasError('min')) {
      return 'El campo Precio debe ser mayor a 0.';
    }
    return '';
  }
  obtenerErrorCampoCategoriaID() {
    let campo = this.form.controls.categoriaid;
    if (campo.hasError('required')) {
      return 'El campo Categoria es requerido';
    }
    if (campo.hasError('min')) {
      return 'El campo Categoria debe estar seleccionado.';
    }
    return '';
  }
  obtenerErrorCampoEstado() {
    const campo = this.form.controls.estado;
    if (campo.hasError('required')) {
      return 'El campo Estado es obligatorio.';
    }
    return '';
  }
  primeraLetraEnMayuscula(valor: any): string{
    if (!valor || typeof valor !== 'string') return valor;
    let resultado=valor.toLowerCase();
    return resultado.charAt(0).toUpperCase() + resultado.slice(1);
  }
  onFileSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/webp'];

      if (!allowedTypes.includes(file.type)) {
        console.error('Solo se permiten archivos WEBP.');
        return;
      }

      if (file.size > 1 * 1024 * 1024) {
        console.error('El archivo no debe superar 1 MB.');
        return;
      }
      this.archivoImagen = file;
    }
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }

    if (this.modoEdicion) {
      const producto: ProductoDTO = this.form.value as ProductoDTO;
      this.posteoFormulario.emit(producto);
    } else {
      const formData = new FormData();
      formData.append('descripcion', this.form.value.descripcion!);
      formData.append('precio', this.form.value.precio!.toString());
      formData.append('categoriaid', this.form.value.categoriaid!.toString());

      if (this.archivoImagen) {
        formData.append(
          'imagenProducto',
          this.archivoImagen,
          this.archivoImagen.name
        );
      }
      this.posteoFormulario.emit(formData);
    }
  }
}
