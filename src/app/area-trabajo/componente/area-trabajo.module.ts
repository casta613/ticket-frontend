import { NgModule } from "@angular/core";
import { AreaTrabajoComponent } from "./area-trabajo.component";
import { CommonModule } from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [AreaTrabajoComponent],
    imports: [CommonModule,HttpClientModule,MatPaginatorModule],
})
export class AreaTrabajoModule{}


