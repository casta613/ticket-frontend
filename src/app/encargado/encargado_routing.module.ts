import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncargadoComponent } from './componente/encargado.component';

const routes: Routes = [
  {
    path: '',
    component: EncargadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadoRoutingModule { }
