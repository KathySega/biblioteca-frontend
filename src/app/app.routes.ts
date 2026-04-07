import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent) },
  {
    path: 'libros',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/libros/libro-list/libro-list.component').then(m => m.LibroListComponent)
  },
  {
    path: 'libros/nuevo',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./pages/libros/libro-form/libro-form.component').then(m => m.LibroFormComponent)
  },
  {
    path: 'libros/:id/editar',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./pages/libros/libro-form/libro-form.component').then(m => m.LibroFormComponent)
  },
  {
    path: 'libros/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/libros/libro-detail/libro-detail.component').then(m => m.LibroDetailComponent)
  },
  {
    path: 'prestamos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/prestamos/prestamo-list/prestamo-list.component').then(m => m.PrestamoListComponent)
  },
  {
    path: 'prestamos/nuevo',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./pages/prestamos/prestamo-form/prestamo-form.component').then(m => m.PrestamoFormComponent)
  },
  { path: '**', redirectTo: '/libros' }
];
