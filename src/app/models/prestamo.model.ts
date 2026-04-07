import { Libro } from './libro.model';
import { Usuario } from './usuario.model';

export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO'
}

export interface Prestamo {
  prestamoId?: number;
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  estado: EstadoPrestamo | string;
  libro?: Libro;
  usuario?: Usuario;
}
