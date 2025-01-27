import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ProductoImagenDTO } from '../producto';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formulario-producto-imagen',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './formulario-producto-imagen.component.html',
  styles: ``,
})
export class FormularioProductoImagenComponent implements OnInit {
  archivoImagen: File | null = null;
  private formBuilder = inject(FormBuilder);

  @Input() modoEdicion: boolean = false;
  @Input() modelo?: ProductoImagenDTO;
  @Output() posteoFormulario = new EventEmitter<FormData>();

  constructor() {}

  sel: string = '';

  ngOnInit(): void {
    if (this.modoEdicion && this.modelo) {
      this.form.patchValue(this.modelo);
    }
  }
  form = this.formBuilder.group({
    descripcion: [''],
    categoria: [''],
  });

  primeraLetraEnMayuscula(valor: any): string {
    if (!valor || typeof valor !== 'string') return valor;
    let resultado = valor.toLowerCase();
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
      const formData = new FormData();
      if (this.archivoImagen) {
        formData.append(
          'imagenProducto',
          this.archivoImagen,
          this.archivoImagen.name
        );
      } /* else {
        console.error('Sin el archivo para la actualización.');
        return;
      } */
      this.posteoFormulario.emit(formData);
    }
  }
}
