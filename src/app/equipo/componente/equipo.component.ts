import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Equipo } from 'src/app/interface/equipo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EquipoService } from 'src/app/services/equipo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent {
  lista:Equipo[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['ID','Nombre','Descripcion','Area','acciones'];
  dataSource = new MatTableDataSource<Equipo>(this.lista);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _servicio: EquipoService,
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

  editar(equipo: Equipo) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: equipo
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
