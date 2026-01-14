import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tarea {
  id_tarea?: number;
  id_usuario: number;
  titulo: string;
  descripcion: string;
  estado?: 'PENDIENTE' | 'COMPLETADA';
  fecha_creacion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TareaService {

  private API_URL = 'http://localhost:3000/api/tareas';

  constructor(private http: HttpClient) { }

  getByUsuario(idUsuario: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.API_URL}/usuario/${idUsuario}`);
  }

  insertar(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.API_URL, tarea);
  }

  actualizar(idTarea: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.API_URL}/${idTarea}`, tarea);
  }

  getById(idTarea: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_URL}/${idTarea}`);
  }

  cambiarEstado(idTarea: number, nuevoEstado: string): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.API_URL}/${idTarea}/estado`, { estado: nuevoEstado });
  }

  eliminar(idTarea: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${idTarea}`);
  }
}