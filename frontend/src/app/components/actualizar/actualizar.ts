import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-actualizar',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.css',
})
export class ActualizarComponents implements OnInit {
  miFormulario!: FormGroup;
  id_usuario!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,        
    private productoService: UsuarioService
  ) {}

  ngOnInit() {
    this.id_usuario = Number(this.route.snapshot.paramMap.get('id'));

    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]]
    });

    this.productoService.getById(this.id_usuario).subscribe({
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
  if (!datos.nombre || datos.nombre.trim() === '') {
      alert("Ingrese nombre de usuario");
      return;
    }

 if (!datos.correo || datos.correo.trim() === '') {
    alert("Ingrese un correo electrónico");
    return;
  }


  
  this.productoService.actualizar(this.id_usuario, datos).subscribe(res => {
    alert("Actualizado");
    this.router.navigate(['/listar']);
  }, err => {
    alert("Error al guardar cambios");
    console.log(err);
  });
}
}