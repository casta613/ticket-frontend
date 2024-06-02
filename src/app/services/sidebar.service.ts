import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[
    {titulo:"Empleado",url:"empleado",icono:"fa fa-users"}]
  
    configuracion:any[]=[{
    titulo:"Configuracion",
    icono:"nav-icon fas fa-tachometer-alt",
    submenu:[
      {titulo:"Empleado",url:"empleado",icono:"fa fa-users"},
      {titulo:"Agencia",url:"agencia",icono:"fa fa-users"},
    ]
  }]
}
