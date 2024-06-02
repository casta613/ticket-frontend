import { NgModule } from "@angular/core";
import { TicketComponent } from "./ticket.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [TicketComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class TicketModule{}


