import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogRegistroComponent } from '../dialogRegistro/dialogRegistro.component';
import { Ticket } from 'src/app/interface/ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from 'src/app/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  listaEmpleado:Ticket[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['Encargado','Creador','Plantilla','Descripcion','Prioridad' ,'Estado','acciones'];
  dataSource = new MatTableDataSource<Ticket>(this.listaEmpleado);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _empleadoServicio: TicketService,
    private dialog: MatDialog,
    private fb:FormBuilder,
    
    
  ) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  
  }  

  mostrar() {
    this._empleadoServicio.get().subscribe({
      next: (data) => {
        console.log(data);
        this.listaEmpleado = data;
        this.dataSource.data = this.listaEmpleado;
      },
      error: (e) => {
        // Manejar errores aquí
      }
    });

   

  }

  editar(ticket: Ticket) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: ticket
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

  agregarRegistro(ticket: Ticket) {
    this.dialog.open(DialogRegistroComponent, {
      disableClose: true,
      data: ticket
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
