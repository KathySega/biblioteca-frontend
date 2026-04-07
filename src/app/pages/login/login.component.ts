import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const { cedula, password } = this.form.value;

    const token = btoa(`${cedula}:${password}`);
    const headers = new HttpHeaders({ Authorization: `Basic ${token}` });

    this.http.get<any>(`${environment.apiUrl}/auth/me`, { headers }).subscribe({
      next: (usuario) => {
        this.authService.login(cedula, password);
        this.authService.setRol(usuario.rol);
        this.loading = false;
        this.router.navigate(['/libros']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401 || err.status === 403) {
          this.error = 'Cédula o contraseña incorrectos.';
        } else {
          this.error = 'Error al conectar con el servidor.';
        }
      }
    });
  }
}
