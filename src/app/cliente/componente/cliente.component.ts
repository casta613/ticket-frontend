import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interface/cliente';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  listaCliente:Cliente[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['ClienteID','Nombre','Telefono', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>(this.listaCliente);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _clienteServicio: ClienteService,
    private dialog: MatDialog,
    private fb:FormBuilder,
    
    
  ) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  
  }  

  mostrar() {
    this._clienteServicio.get().subscribe({
      next: (data) => {
        
        this.listaCliente = data;
        this.dataSource.data = this.listaCliente;
      },
      error: (e) => {
        // Manejar errores aquí
      }
    });

   

  }

  editar(cliente: Cliente) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: cliente
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
