import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tareas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartareas',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listartareas.html',
  styleUrl: './listartareas.css',
})
export class ListartareasComponent implements OnInit {
tareas: any[] = [];
  idUsuario: number = 1;

  constructor(private service: TareaService) {}

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    if (this.idUsuario > 0) {
      this.service.getByUsuario(this.idUsuario).subscribe({
        next: (res) => this.tareas = res,
        error: () => this.tareas = [] 
      });
    }
  }

  cambiarEstado(tarea: any) {
    const nuevoEstado = tarea.estado === 'PENDIENTE' ? 'COMPLETADA' : 'PENDIENTE';
    this.service.cambiarEstado(tarea.id_tarea, nuevoEstado).subscribe(() => this.cargarTareas());
  }

  eliminar(id: number) {
    if (confirm("¿Eliminar tarea?")) {
      this.service.eliminar(id).subscribe(() => this.cargarTareas());
    }
  }
}