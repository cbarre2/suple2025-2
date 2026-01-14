import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id_usuario?: number;
  nombre: string;
  correo: string;
  fecha_creacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos 
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`);
  }

  //Insertar un nuevo 
  insertar(producto: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_URL, producto);
  }

actualizar(codigo: number, producto: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${codigo}`, producto);
  }

  // 3. Eliminar por código
  eliminar(codigo: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${codigo}`);
  }
}