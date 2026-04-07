import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegistroRequest } from '../models/registro-request.model';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  registro(data: RegistroRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/registro`, data);
  }

  login(cedula: string, password: string): void {
    sessionStorage.setItem('cedula', cedula);
    sessionStorage.setItem('password', password);
  }

  setRol(rol: string): void {
    sessionStorage.setItem('rol', rol);
  }

  logout(): void {
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('cedula') && !!sessionStorage.getItem('password');
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('rol') === 'ROLE_ADMIN';
  }

  getCedula(): string | null {
    return sessionStorage.getItem('cedula');
  }

  getAuthHeaders(): HttpHeaders {
    const cedula = sessionStorage.getItem('cedula');
    const password = sessionStorage.getItem('password');
    const token = btoa(`${cedula}:${password}`);
    return new HttpHeaders({ Authorization: `Basic ${token}` });
  }
}
