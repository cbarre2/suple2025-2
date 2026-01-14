import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

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
    private service: UsuarioService,
    private router: Router
  ) { }

ngOnInit() {
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]] 
  });
}

  enviar() {
    let datos = this.form.value;
    if (!datos.nombre || datos.nombre.trim() === '') {
      alert("Ingrese nombre de usuario");
      return;
    }

 if (!datos.correo || datos.correo.trim() === '') {
    alert("Ingrese un correo electrónico");
    return;
  }


    this.service.insertar(datos).subscribe(() => {
      alert("Usuario Guardado");
      this.router.navigate(['/listar']);
    });
  }
}