import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../../services/libro.service';
import { Categoria, Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './libro-form.component.html'
})
export class LibroFormComponent implements OnInit {
  form: FormGroup;
  editando = false;
  libroId: number | null = null;
  loading = false;
  error = '';
  categorias = Object.values(Categoria);

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      cantidadDisponible: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id')) || null;
    this.editando = !!this.libroId;
    if (this.editando && this.libroId) {
      this.libroService.getLibro(this.libroId).subscribe({
        next: (libro) => this.form.patchValue(libro),
        error: () => this.error = 'No se pudo cargar el libro.'
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    const libro: Libro = this.form.value;

    const op = this.editando && this.libroId
      ? this.libroService.actualizarLibro(this.libroId, libro)
      : this.libroService.crearLibro(libro);

    op.subscribe({
      next: (result) => {
        this.loading = false;
        this.router.navigate(['/libros', result.id]);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 400) {
          this.error = 'Datos inválidos. Verifique los campos.';
        } else {
          this.error = 'Error al guardar el libro.';
        }
      }
    });
  }
}
