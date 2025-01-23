import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cuadro-confirmacion',
  imports: [],
  templateUrl: './cuadro-confirmacion.component.html',
  styles: ``
})
export class CuadroConfirmacionComponent {
  constructor(public dialogRef: MatDialogRef<CuadroConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
