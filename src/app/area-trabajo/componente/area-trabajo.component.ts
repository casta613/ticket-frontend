import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { AreaTrabajo } from 'src/app/interface/area-trabajo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AreaTrabajoService } from 'src/app/services/area-trabajo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-area-trabajo',
  templateUrl: './area-trabajo.component.html',
  styleUrls: ['./area-trabajo.component.scss']
})
export class AreaTrabajoComponent {
  lista:AreaTrabajo[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['ID','Nombre','Descripcion','acciones'];
  dataSource = new MatTableDataSource<AreaTrabajo>(this.lista);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _servicio: AreaTrabajoService,
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

  editar(areaTrabajo: AreaTrabajo) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: areaTrabajo
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
