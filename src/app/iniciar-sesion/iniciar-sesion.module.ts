import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { IniciarSesionRoutingModule } from './iniciar-sesion-routing.module';
import { LoginComponent } from './componentes/Login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrarComponent } from './paginas/registrar/registrar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTablesModule } from 'angular-datatables';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    IniciarSesionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    DataTablesModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class IniciarSesionModule { }
