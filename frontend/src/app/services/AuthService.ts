import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = signal<any>(null);

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user.set(JSON.parse(savedUser));
    }
  }

  login(token: string, userData: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    this.user.set(userData); 
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
  }

  // Método para saber si es administrador
  esAdmin(): boolean {
    return this.user()?.rol === 'admin';
  }
}