import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tareas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-creartarea',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creartarea.html',
  styleUrl: './creartarea.css',
})
export class CreartareaComponent {
form: FormGroup;
  usuarioExiste = false;
  buscando = false;
  nombreUsuario = '';

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      id_usuario: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  validarUsuario() {
    const id = this.form.get('id_usuario')?.value;
    if (!id) return;

    this.buscando = true;
    this.usuarioExiste = false;

    this.usuarioService.getById(id).subscribe({
      next: (user) => {
        this.usuarioExiste = true;
        this.buscando = false;
        this.nombreUsuario = user.nombre; // Mostramos el nombre para confirmar
      },
      error: () => {
        this.usuarioExiste = false;
        this.buscando = false;
        this.nombreUsuario = '';
      }
    });
  }

  enviar() {
    if (this.form.invalid || !this.usuarioExiste) return;

    this.tareaService.insertar(this.form.value).subscribe(() => {
      alert("Tarea guardada correctamente");
      this.form.reset();
      this.usuarioExiste = false;
    });
  }
}