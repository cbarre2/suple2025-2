import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { Producto, ProductoService } from '../../services/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, FormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class ListarComponent implements OnInit {
  productos: any[] = [];
  filtrados: any[] = [];
  busqueda: string = '';

  constructor(
    private service: ProductoService, 
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getTodos().subscribe(res => {
      this.productos = res;
      this.filtrados = res;
    });
  }

  //buscar pro nombre, tipo, precio venta
  buscar() {
    this.filtrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      p.tipo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
       p.precio_venta.toString().includes(this.busqueda.toLowerCase())
    );
  }

  eliminar(id: any) {
    if (confirm("¿Seguro?")) {
      this.service.eliminar(id).subscribe(() => {
        this.productos = this.productos.filter(p => p.codigo !== id);
        this.buscar();
        alert("Eliminado");
      });
    }
  }

  irAEditar(id: any) {
    this.router.navigate(['/actualizar', id]);
  }
}