import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var Swal: any;

@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  credentials = {
    usuario: '',
    contrasena: ''
  };

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router
  ) {}

  onLogin() {
    this.http.post('http://localhost:3000/api/auth/login', this.credentials)
      .subscribe({
        next: (res: any) => {
          this.authService.login(res.token, res.user);

          this.router.navigate(['/listar']); 
        },
        error: (err) => {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
      });
  }
}
