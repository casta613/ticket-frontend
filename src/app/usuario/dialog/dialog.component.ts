import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../interface/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import {Rol} from '../../interface/rol';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  listaRol:Rol[]=[];

  dataSource = new MatTableDataSource<Rol>(this.listaRol);
  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: Usuario,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioService,
    
  ) {
    this.form = this.fb.group({
      ID: [null, Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: [null, Validators.required],
      Estatus:[false, Validators.required],
      Contraseña: ['', Validators.required],
      IDRol: [null, Validators.required],
    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        ID: this.Editar.ID,
        Nombre: this.Editar.Nombre,
        Apellido: String(this.Editar.Apellido),
        Contraseña: this.Editar.Contraseña,
        Correo: String(this.Editar.Correo),
        Estatus: Boolean(this.Editar.Estatus),
        IDRol: this.Editar.IDRol,
      })
    };
   this.listarRol();
  }
  listarRol() {
    this._usuarioServicio.getRol().subscribe({
    next: (data) => {
      console.log('listaRol');
      console.log(data);
      this.listaRol = data;
      this.dataSource.data = this.listaRol;
    },
    error: (e) => {
      // Manejar errores aquí
    }
  });
}
  agregar() {
    const _usuario: Usuario = {
      ID:  this.form.value.ID == null ? 0 : this.form.value.ID,
      Nombre: this.form.value.Nombre,
      Apellido: this.form.value.Apellido,
      Contraseña: this.form.value.Contraseña,
      Correo: this.form.value.Correo,
      Estatus: this.form.value.Estatus,
      IDRol: this.form.value.IDRol

      
    }
    
    if (this.Editar) {
      console.log(_usuario);
      
      this._usuarioServicio.edit(_usuario).subscribe({
          next: (data) => {
  
            
              console.log(data);
              this.dialogoReferencia.close('editado')           
  
          },
          error: (e) => {
          },
          complete: () => {
          }
      }) 
      
      

    }else {
      
      this._usuarioServicio.save(_usuario).subscribe({
        next: (data) => {

          
            console.log(data);
            this.dialogoReferencia.close('agregado')          

        },
        error: (e) => {
        },
        complete: () => {
        }
      })
    }
  }
  cerrarDialogo() {
    this.dialogoReferencia.close(); 
  }



}
