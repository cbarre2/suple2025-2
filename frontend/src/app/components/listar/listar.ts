import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, FormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class ListarComponent implements OnInit {
  usuarios: any[] = [];

  constructor(
    private service: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.usuarios = res;
    });
  }

  
  eliminar(id: any) {
    if (confirm("¿Seguro?")) {
      this.service.eliminar(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(p => p.id_usuario !== id);
        alert("Eliminado");
      });
    }
  }

  irAEditar(id: any) {
    this.router.navigate(['/actualizar', id]);
  }
}