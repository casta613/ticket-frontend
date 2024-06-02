import { Component } from '@angular/core';
import {AccesoService} from "../../../services/acceso.service";
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public active: boolean = false; //esta bandera es para desplegar menu
  allowedRoutes: number[] = [];
  isRouteAllowed(routeId: number): boolean {
    return this.allowedRoutes.includes(routeId);
  }
  constructor(  private _accesoService: AccesoService
  ) {}
  ngOnInit(): void {
    this.validarCodigo();
  }
 
  validarCodigo(){
        
    this._accesoService.getValidationPermiso().subscribe({
          next: (data: number[]) => { // Asegúrate de que data sea un array de números
            this.allowedRoutes = data;

          }                             
      
    })
}

  setActive() : void {
      this.active = !this.active
  }
}
