import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Usuario } from 'src/app/interface/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  listaUsuario:Usuario[]=[];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = ['Nombre','Apellido','Correo' ,'Estado','acciones'];
  dataSource = new MatTableDataSource<Usuario>(this.listaUsuario);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _usuarioServicio: UsuarioService,
    private dialog: MatDialog,
    private fb:FormBuilder,
    
    
  ) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  
  }  

  mostrar() {
    this._usuarioServicio.get().subscribe({
      next: (data) => {
        console.log(data);
        this.listaUsuario = data;
        this.dataSource.data = this.listaUsuario;
      },
      error: (e) => {
        // Manejar errores aquí
      }
    });

   

  }

  editar(usuario: Usuario) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: usuario
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
