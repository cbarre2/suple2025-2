import { Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar';
import { CrearComponent } from './components/crear/crear';
import { ActualizarComponents } from './components/actualizar/actualizar';
import { ListartareasComponent } from './components/listartareas/listartareas';
import { CreartareaComponent } from './components/creartarea/creartarea';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  
  { path: 'listar', component: ListarComponent },
   { path: 'crear', component: CrearComponent },
   
   { path: 'actualizar/:id', component: ActualizarComponents },

   { path: 'tareas/:id_usuario', component: ListartareasComponent },
   { path: 'crear-tarea/:id_usuario', component: CreartareaComponent },
  { path: '**', redirectTo: 'login' } 
];