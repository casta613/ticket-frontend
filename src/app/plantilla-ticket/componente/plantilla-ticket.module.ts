import { NgModule } from "@angular/core";
import { PlantillaTicketComponent } from "./plantilla-ticket.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [PlantillaTicketComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class PlantillaTicketModule{}


