import { Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar';
import { CrearComponent } from './components/crear/crear';
import { ActualizarComponents } from './components/actualizar/actualizar';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  
  { path: 'listar', component: ListarComponent },
   { path: 'crear', component: CrearComponent },
   
   { path: 'actualizar/:id', component: ActualizarComponents },
  
  { path: '**', redirectTo: 'login' } 
];