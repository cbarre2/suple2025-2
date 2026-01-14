import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos';
import { AuthService } from '../../services/AuthService';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './crear.html',
  styleUrl: './crear.css',
})

export class CrearComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProductoService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [''],
      tipo: [''],
      stock: [0],
      precio_compra: [0],
      precio_venta: [0],
      anticipo: [0]
    });
  }

  enviar() {
    let datos = this.form.value;
    if (!datos.nombre || datos.nombre.trim() === '') {
      alert("Ingrese nombre de producto");
      return;
    }
    // Validar que el tipo no esté vacío
    if (!datos.tipo || datos.tipo.trim() === '') {
      alert("Seleccione tipo de producto");
      return;
    }

    if (datos.stock <= 0) {
      alert("Ingrese stock mayor a 0");
      return;
    }

      if (datos.precio_compra <= 0) {
      alert("Ingrese precio de compra mayor a 0");
      return;
    }

    if (datos.precio_venta <= 0) {
      alert("Ingrese precio de venta mayor a 0 y mayor a precio de compra");
      return;
    }

    //  Validar los precios
    if (datos.precio_venta <= datos.precio_compra) {
      alert("El precio de venta debe ser más alto que el de compra");
      return;
    }

    if (datos.tipo === 'Viajes' && (!datos.anticipo || datos.anticipo <= 0)) {
    alert("Para viajes, el anticipo debe ser mayor a 0");
    return;
  }
  
    this.service.insertar(datos).subscribe(() => {
      alert("Producto Guardado");
      this.router.navigate(['/listar']);
    });
  }
}