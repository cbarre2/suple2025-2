import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../../services/tareas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editartarea',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editartarea.html',
  styleUrl: './editartarea.css',
})
export class EditartareaComponent implements OnInit {
  form!: FormGroup;
  idTarea!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: TareaService
  ) {}

 ngOnInit() {
  this.idTarea = Number(this.route.snapshot.paramMap.get('id'));

  this.form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    estado: ['', Validators.required]
  });

  this.service.getById(this.idTarea).subscribe(res => {
    this.form.patchValue(res); 
  });
}
  enviar() {
    if (this.form.invalid) return;

    this.service.actualizar(this.idTarea, this.form.value).subscribe(() => {
      alert("Tarea Actualizada");
      this.router.navigate(['/listartareas']);
    });
  }
}