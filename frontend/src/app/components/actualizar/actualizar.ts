import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-actualizar',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.css',
})
export class ActualizarComponents implements OnInit {
  miFormulario!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,        
    private productoService: ProductoService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      precio_compra: [0, [Validators.required, Validators.min(0.01)]],
      precio_venta: [0, [Validators.required, Validators.min(0.01)]],
      anticipo: ['']
    });

    this.productoService.getPorId(this.id).subscribe({
      next: (prod) => {
        this.miFormulario.patchValue(prod);
      },
      error: () => window.alert('Error al cargar el producto')
    });
  }

 actualizar() {
  if (this.miFormulario.invalid) {
    alert("Completa todos los campos");
    return;
  }

  let datos = this.miFormulario.value;

  // Validar precios
  if (Number(datos.precio_venta) <= Number(datos.precio_compra)) {
    alert("La venta debe ser mayor a la compra");
    return;
  }

  if (datos.tipo !== 'Viajes') {
    datos.anticipo = '0'; 
  }

     if (datos.tipo === 'Viajes' && (!datos.anticipo || datos.anticipo <= 0)) {
    alert("Para viajes, el anticipo debe ser mayor a 0");
    return;
  }
  
  this.productoService.actualizar(this.id, datos).subscribe(res => {
    alert("Actualizado");
    this.router.navigate(['/listar']);
  }, err => {
    alert("Error al guardar cambios");
    console.log(err);
  });
}
}