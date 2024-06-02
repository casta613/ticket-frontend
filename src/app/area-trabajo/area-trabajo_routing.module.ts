import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaTrabajoComponent } from './componente/area-trabajo.component';

const routes: Routes = [
  {
    path: '',
    component: AreaTrabajoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaTrabajoRoutingModule { }
