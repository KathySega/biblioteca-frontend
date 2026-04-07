import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../../services/libro.service';
import { PrestamoService } from '../../../services/prestamo.service';
import { AuthService } from '../../../services/auth.service';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-prestamo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './prestamo-form.component.html'
})
export class PrestamoFormComponent implements OnInit {
  form: FormGroup;
  librosDisponibles: Libro[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private prestamoService: PrestamoService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      libroId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe({
      next: (libros) => {
        this.librosDisponibles = libros.filter(l => l.cantidadDisponible > 0);
        const libroId = this.route.snapshot.queryParamMap.get('libroId');
        if (libroId) {
          this.form.patchValue({ libroId });
        }
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    const payload = {
      cedula: this.form.value.cedula,
      libroId: Number(this.form.value.libroId)
    };
    this.prestamoService.crearPrestamo(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/prestamos']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {
          this.error = 'Usuario o libro no encontrado.';
        } else if (err.status === 400) {
          this.error = err.error?.message ?? 'No se puede registrar el préstamo (sin stock o límite alcanzado).';
        } else {
          this.error = 'Error al registrar el préstamo.';
        }
      }
    });
  }
}
