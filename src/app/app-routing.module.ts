import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m =>m.IniciarSesionModule) //ruta inicio-sesion
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m =>m.IniciarSesionModule) //ruta inicio-sesion
  },
  {
    path: 'home',
    loadChildren: () => import('./bienvenida/bienvenida.module').then(m => m.BienvenidaModule) //ruta padre, carga peresosa
  },
  {
    path: 'tickets',
    loadChildren: () => import('./ticket/ticket.module').then(m =>m.TicketModule) //ruta cliente
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then(m =>m.UsuarioModule) //ruta cliente
  },
  {
    path: 'areas',
    loadChildren: () => import('./area-trabajo/area-trabajo.module').then(m =>m.AreaTrabajoModule) //ruta cliente
  },
  {
    path: 'equipos',
    loadChildren: () => import('./equipo/equipo.module').then(m =>m.EquipoModule) //ruta cliente
  },
  {
    path: 'encargados',
    loadChildren: () => import('./encargado/encargado.module').then(m =>m.EncargadoModule) //ruta cliente
  },
  {
    path: 'plantillas-ticket',
    loadChildren: () => import('./plantilla-ticket/plantilla-ticket.module').then(m =>m.PlantillaTicketModule) //ruta cliente
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
