import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo.service';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { Prestamo } from '../../../models/prestamo.model';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './prestamo-list.component.html'
})
export class PrestamoListComponent implements OnInit {
  prestamos: Prestamo[] = [];
  loading = false;
  error = '';
  successMsg = '';
  cedulaBusqueda = '';

  constructor(
    private prestamoService: PrestamoService,
    public authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.cargar(this.authService.getCedula()!);
    }
  }

  buscar(): void {
    if (!this.cedulaBusqueda.trim()) return;
    this.cargar(this.cedulaBusqueda.trim());
  }

  private cargar(cedula: string): void {
    this.loading = true;
    this.error = '';
    this.prestamoService.getPrestamosPorUsuario(cedula).subscribe({
      next: (data) => { this.prestamos = data; this.loading = false; },
      error: (err) => {
        this.loading = false;
        this.error = err.status === 404 ? 'Usuario no encontrado.' : 'Error al cargar préstamos.';
      }
    });
  }

  devolver(id: number): void {
    this.modalService.confirm({
      title: 'Confirmar devolución',
      message: '¿Estás seguro de que deseas registrar la devolución de este préstamo?',
      confirmLabel: 'Sí, devolver',
      cancelLabel: 'Cancelar',
      type: 'warning'
    }).subscribe(confirmed => {
      if (!confirmed) return;
      this.prestamoService.devolverPrestamo(id).subscribe({
        next: () => {
          this.successMsg = 'Devolución registrada.';
          const cedula = this.authService.isAdmin() ? this.cedulaBusqueda : this.authService.getCedula()!;
          this.cargar(cedula);
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: (err) => {
          this.error = err.status === 400 ? 'El préstamo ya fue devuelto.' : 'Error al registrar devolución.';
        }
      });
    });
  }
}
