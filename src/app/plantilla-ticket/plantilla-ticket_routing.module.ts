import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaTicketComponent } from './componente/plantilla-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: PlantillaTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillaTicketRoutingModule { }
