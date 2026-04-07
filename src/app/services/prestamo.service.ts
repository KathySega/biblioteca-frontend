import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Prestamo } from '../models/prestamo.model';
import { PrestamoRequest } from '../models/prestamo-request.model';

@Injectable({ providedIn: 'root' })
export class PrestamoService {
  private base = `${environment.apiUrl}/prestamos`;

  constructor(private http: HttpClient) {}

  getPrestamosPorUsuario(cedula: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.base}/usuario/${cedula}`);
  }

  crearPrestamo(request: PrestamoRequest): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.base, request);
  }

  devolverPrestamo(id: number): Observable<Prestamo> {
    return this.http.patch<Prestamo>(`${this.base}/${id}/devolver`, null);
  }
}
