export interface Producto {
  productoID: number;
  descripcion: string;
  precio: number;
  categoriaID: number;
  imagenID: number | null;
  estado: string;
}
export interface ProductoDTO {
  productoID: number;
  descripcion: string;
  precio: number;
  categoriaID: number;
  estado: string;
}
export interface ProductoImagenDTO {
  productoID: number;
  descripcion: string;
  categoria: string;
  url: string;
}
export interface ProductoCreacionDTO {
  descripcion: string;
  precio: number;
  categoriaID: number;
}

export interface imagen {
  imagenID: number;
  url: string;
  publicid: string;
  estado: string;
}
export interface Opcion {
  name: string;
  abr: string;
}