export enum Rol {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

export interface Usuario {
  id?: number;
  nombre: string;
  cedula: string;
  email: string;
  rol?: string;
}
