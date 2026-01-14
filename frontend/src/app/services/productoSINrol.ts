import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface Producto {
//   codigo?: number;
//   nombre: string;
//   tipo: string;
//   stock: number;
//   precio_compra: number;
//   precio_venta: number;
//   anticipo?: number | null;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductoSINrolService {

//   private API_URL = 'http://localhost:3000/api/productos';

//   constructor(private http: HttpClient) { }

//   // Obtener todos los productos
//   get(): Observable<Producto[]> {
//     return this.http.get<Producto[]>(this.API_URL);
//   }

//   //Insertar un nuevo producto
//   insertar(producto: Producto): Observable<Producto> {
//     return this.http.post<Producto>(this.API_URL, producto);
//   }

//   // 3. Eliminar un producto por código
//   eliminar(codigo: number): Observable<any> {
//     return this.http.delete(`${this.API_URL}/${codigo}`);
//   }
// }