import { NgModule } from "@angular/core";
import { EncargadoComponent } from "./encargado.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [EncargadoComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class EncargadoModule{}


