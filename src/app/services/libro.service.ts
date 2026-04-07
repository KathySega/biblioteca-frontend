import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Libro } from '../models/libro.model';

@Injectable({ providedIn: 'root' })
export class LibroService {
  private base = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.base);
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.base}/${id}`);
  }

  buscarPorTitulo(titulo: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.base}/buscar`, { params: { titulo } });
  }

  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.base, libro);
  }

  actualizarLibro(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.base}/${id}`, libro);
  }

  actualizarStock(id: number, cantidad: number): Observable<Libro> {
    return this.http.patch<Libro>(`${this.base}/${id}/stock`, null, {
      params: { cantidad: cantidad.toString() }
    });
  }
}
