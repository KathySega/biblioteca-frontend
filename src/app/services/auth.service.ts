import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegistroRequest } from '../models/registro-request.model';
import { Usuario } from '../models/usuario.model';

interface Credentials {
  cedula: string;
  password: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private credentials = signal<Credentials | null>(null);

  constructor(private http: HttpClient) {}

  registro(data: RegistroRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/registro`, data);
  }

  login(cedula: string, password: string): void {
    this.credentials.set({ cedula, password, rol: '' });
  }

  setRol(rol: string): void {
    const current = this.credentials();
    if (current) {
      this.credentials.set({ ...current, rol });
    }
  }

  logout(): void {
    this.credentials.set(null);
  }

  isAuthenticated(): boolean {
    const c = this.credentials();
    return !!c?.cedula && !!c?.password;
  }

  isAdmin(): boolean {
    return this.credentials()?.rol === 'ROLE_ADMIN';
  }

  getCedula(): string | null {
    return this.credentials()?.cedula ?? null;
  }

  getAuthHeaders(): HttpHeaders {
    const c = this.credentials();
    const token = btoa(`${c?.cedula}:${c?.password}`);
    return new HttpHeaders({ Authorization: `Basic ${token}` });
  }
}
