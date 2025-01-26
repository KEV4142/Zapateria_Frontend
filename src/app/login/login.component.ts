import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  cargando: boolean = false;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.cargando = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.cargando = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.cargando = false;
          this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }
}
