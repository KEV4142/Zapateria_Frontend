export interface ProductoDTO {
  productoID: number;
  descripcion: string | null;
  precio: number | null;
  categoriaID: number;
  imagenID: number | null;
  estado: string;
}
export interface ProductoCreacionDTO {
  descripcion: string | null;
  precio: number | null;
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