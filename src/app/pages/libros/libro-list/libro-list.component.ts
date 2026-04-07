import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { AuthService } from '../../../services/auth.service';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './libro-list.component.html'
})
export class LibroListComponent implements OnInit {
  libros: Libro[] = [];
  loading = true;
  error = '';
  searchTitulo = '';

  constructor(
    private libroService: LibroService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error = '';
    this.libroService.getLibros().subscribe({
      next: (data) => { this.libros = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar los libros.'; this.loading = false; }
    });
  }

  buscar(): void {
    if (!this.searchTitulo.trim()) {
      this.cargar();
      return;
    }
    this.loading = true;
    this.libroService.buscarPorTitulo(this.searchTitulo).subscribe({
      next: (data) => { this.libros = data; this.loading = false; },
      error: () => { this.error = 'Error al buscar.'; this.loading = false; }
    });
  }

  limpiar(): void {
    this.searchTitulo = '';
    this.cargar();
  }
}
