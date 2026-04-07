export enum Categoria {
  CIENCIA = 'CIENCIA',
  LITERATURA = 'LITERATURA',
  TECNOLOGIA = 'TECNOLOGIA',
  HISTORIA = 'HISTORIA'
}

export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  cantidadDisponible: number;
  categoria: Categoria;
}
