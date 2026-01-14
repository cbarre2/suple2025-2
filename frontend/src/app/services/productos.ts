import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

export interface Producto {
  codigo?: number;
  nombre: string;
  tipo: string;
  stock: number;
  precio_compra: number;
  precio_venta: number;
  anticipo?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_URL = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  // Función privada para generar los headers con el token
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  //Obtener todos
  getTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL, { headers: this.getHeaders() });
  }

  // Obtener un solo producto por su código
  getPorId(codigo: number): Observable<Producto> {
  return this.http.get<Producto>(`${this.API_URL}/${codigo}`, { 
    headers: this.getHeaders() 
  });
  }
  //insertar
  insertar(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, producto, { headers: this.getHeaders() });
  }

  //actualizar
  actualizar(codigo: number, producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.API_URL}/${codigo}`, producto, { 
    headers: this.getHeaders() 
  });
  }

  //eliminar
  eliminar(codigo: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${codigo}`, { headers: this.getHeaders() });
  }
}