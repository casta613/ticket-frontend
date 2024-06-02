import { NgModule } from "@angular/core";
import { EquipoComponent } from "./equipo.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [EquipoComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class AEquipoModule{}


