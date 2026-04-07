import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../../services/libro.service';
import { AuthService } from '../../../services/auth.service';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-libro-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './libro-detail.component.html'
})
export class LibroDetailComponent implements OnInit {
  libro: Libro | null = null;
  loading = true;
  error = '';
  stockMsg = '';
  stockLoading = false;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libroService.getLibro(id).subscribe({
      next: (data) => { this.libro = data; this.loading = false; },
      error: () => { this.error = 'Libro no encontrado.'; this.loading = false; }
    });
  }

  ajustarStock(delta: number): void {
    if (!this.libro?.id) return;
    const nueva = (this.libro.cantidadDisponible ?? 0) + delta;
    if (nueva < 0) return;
    this.stockLoading = true;
    this.libroService.actualizarStock(this.libro.id, nueva).subscribe({
      next: (updated) => {
        this.libro = updated;
        this.stockMsg = 'Stock actualizado.';
        this.stockLoading = false;
        setTimeout(() => this.stockMsg = '', 2000);
      },
      error: () => { this.stockMsg = 'Error al actualizar stock.'; this.stockLoading = false; }
    });
  }
}
