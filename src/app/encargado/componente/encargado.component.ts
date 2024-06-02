import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Encargado } from 'src/app/interface/encargado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EncargadoService } from 'src/app/services/encargado.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.scss']
})
export class EncargadoComponent {
  lista:Encargado[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['ID','NombreUsuario','NombreEquipo','acciones'];
  dataSource = new MatTableDataSource<Encargado>(this.lista);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _servicio: EncargadoService,
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

  editar(encargado: Encargado) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: encargado
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
