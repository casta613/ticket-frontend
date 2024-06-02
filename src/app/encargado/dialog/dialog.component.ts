import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Encargado } from '../../interface/encargado';
import { EncargadoService } from '../../services/encargado.service';
import { Equipo } from '../../interface/equipo';
import { EquipoService } from '../../services/equipo.service';
import { Usuario } from '../../interface/usuario';
import { UsuarioService } from '../../services/usuario.service';

import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  listaUsuario:Usuario[]=[];

  dataSource = new MatTableDataSource<Usuario>(this.listaUsuario);

  listaEquipo:Equipo[]=[];

  dataSourceEquipo = new MatTableDataSource<Equipo>(this.listaEquipo);

  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: Encargado,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _servicio: EncargadoService,
    private _servicioEquipo: EquipoService,
    private _servicioUsuario: UsuarioService,
  ) {
    this.form = this.fb.group({
      ID: [null, Validators.required],
      IDUsuario: [null, Validators.required],
      IDEquipo: [null, Validators.required],
   
    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        ID: this.Editar.ID,   
        IDUsuario: this.Editar.IDUsuario,
        IDEquipo: this.Editar.IDEquipo,
        NombreUsuario: this.Editar.NombreUsuario,
        NombreEquipo: this.Editar.NombreEquipo,
        
      })
    };
    this.listarUsuario();
    this.listarEquipo();
  } 

  listarUsuario() {
    this._servicioUsuario.get().subscribe({
    next: (data) => {
      console.log('listarUsuario');
      console.log(data);
      this.listaUsuario = data;
      this.dataSource.data = this.listaUsuario;
    },
    error: (e) => {
      // Manejar errores aquí
    }
  });

 

}

listarEquipo() {
  this._servicioEquipo.get().subscribe({
  next: (data) => {
    console.log('listarEquipo');
    console.log(data);
    this.listaEquipo = data;
    this.dataSourceEquipo.data = this.listaEquipo;
  },
  error: (e) => {
    // Manejar errores aquí
  }
});



}

  
  agregar() {
    const _encargado: Encargado = {
      ID:  this.form.value.ID == null ? 0 : this.form.value.ID,
      IDEquipo: this.form.value.IDEquipo,
      IDUsuario: this.form.value.IDUsuario,
            
    }
    
    if (this.Editar) {
      console.log(_encargado);
      this._servicio.edit(_encargado).subscribe({
          next: (data) => {
  
            
              console.log(data);
              this.dialogoReferencia.close('editar')           
  
          },
          error: (e) => {
          },
          complete: () => {
          }
      }) 
      
      

    }else {
      
      this._servicio.save(_encargado).subscribe({
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
