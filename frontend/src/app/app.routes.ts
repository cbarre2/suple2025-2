import { Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar';
import { CrearComponent } from './components/crear/crear';
import { LoginComponent } from './components/login/login';
import { ActualizarComponents } from './components/actualizar/actualizar';


export const routes: Routes = [
  // Ruta por defecto: ahora redirige a 'listar' para que no de error
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  
  { path: 'listar', component: ListarComponent },
   { path: 'crear', component: CrearComponent },
   
  { path: 'login', component: LoginComponent },
   { path: 'actualizar/:id', component: ActualizarComponents },
  
  // Ruta comodín por si el usuario escribe cualquier cosa mal
  { path: '**', redirectTo: 'login' } 
];