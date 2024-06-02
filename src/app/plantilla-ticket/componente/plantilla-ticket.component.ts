import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { PlantillaTicket } from 'src/app/interface/plantilla-ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PlantillaTicketService } from 'src/app/services/plantilla-ticket.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plantilla-ticket',
  templateUrl: './plantilla-ticket.component.html',
  styleUrls: ['./plantilla-ticket.component.scss']
})
export class PlantillaTicketComponent {
  lista:PlantillaTicket[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['ID','Titulo','Area','acciones'];
  dataSource = new MatTableDataSource<PlantillaTicket>(this.lista);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _servicio: PlantillaTicketService,
    private dialog: MatDialog,
    private fb:FormBuilder,
    
    
  ) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  
  }  

  mostrar() {
    this._servicio.get().subscribe({
      next: (data) => {
        console.log(data);
        this.lista = data;
        this.dataSource.data = this.lista;
      },
      error: (e) => {
        // Manejar errores aquí
      }
    });

   

  }

  editar(plantillaTicket: PlantillaTicket) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: plantillaTicket
    }).afterClosed().subscribe(result => {

      if (result === "editado")
        this.mostrar();

    });
  }

  agregar() {
    this.dialog.open(DialogComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "agregado") {
        this.mostrar();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {    

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      
    };

    this.mostrar();
    
  } 
}
