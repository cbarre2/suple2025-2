import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('employee-front');

  constructor( public authService: AuthService, public router: Router) {}
  
  salir() {
    // Borra el token y el usuario del localStorage
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
