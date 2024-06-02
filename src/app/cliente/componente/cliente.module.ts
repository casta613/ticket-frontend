import { NgModule } from "@angular/core";
import { ClienteComponent } from "./cliente.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [ClienteComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class ClienteModule{}


