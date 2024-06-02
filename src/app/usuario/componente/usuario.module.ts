import { NgModule } from "@angular/core";
import { UsuarioComponent } from "./usuario.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [UsuarioComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class UsuarioModule{}


