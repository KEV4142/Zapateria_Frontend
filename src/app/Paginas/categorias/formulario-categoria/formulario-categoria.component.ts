import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CategoriaCreacionDTO, CategoriaDTO } from '../categoria';

interface Opcion {
  name: string;
  abr: string;
}

@Component({
  selector: 'app-formulario-categoria',
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
  templateUrl: './formulario-categoria.component.html',
  styles: ``,
})
export class FormularioCategoriaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  opciones: Opcion[] = [
    { name: 'Activo', abr: 'A' },
    { name: 'Bloqueado', abr: 'B' },
    { name: 'Inactivo', abr: 'I' },
  ];
  
  @Input() modoEdicion: boolean = false;
  @Input() modelo?: CategoriaDTO;
  @Output() posteoFormulario = new EventEmitter<CategoriaCreacionDTO>();
  form = this.formBuilder.group({
    descripcion: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    estado: [''],
  });
  ngOnInit(): void {
    if (this.modoEdicion && this.modelo) {
      this.form.patchValue(this.modelo);
      this.form.controls.estado.setValidators([Validators.required]);
      this.form.controls.estado.updateValueAndValidity();
    } else {
      this.form.controls.estado.clearValidators();
      this.form.controls.estado.updateValueAndValidity();
    }
  }
  sel: string = '';
  obtenerErrorCampoDescripcion() {
    let campo = this.form.controls.descripcion;
    if (campo.hasError('required')) {
      return 'El campo Descripcion es requerido.';
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
  guardarCambios(){
    if (!this.form.valid){
      return;
    }

    if (this.modoEdicion) {
      const categoria: CategoriaDTO = this.form.value as CategoriaDTO;
      this.posteoFormulario.emit(categoria);
    } else {
      const categoria: CategoriaCreacionDTO = {
        descripcion: this.form.value.descripcion!,
      };
      this.posteoFormulario.emit(categoria);
    }
  }
}
