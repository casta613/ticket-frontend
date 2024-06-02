import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreaTrabajo } from '../../interface/area-trabajo';
import { AreaTrabajoService } from '../../services/area-trabajo.service';
import { Equipo } from '../../interface/equipo';
import { EquipoService } from '../../services/equipo.service';


import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  listaAreaTrabajo:AreaTrabajo[]=[];

  dataSource = new MatTableDataSource<AreaTrabajo>(this.listaAreaTrabajo);

  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: Equipo,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _servicio: EquipoService,
    private _servicioAreaTrabajo: AreaTrabajoService,
    
  ) {
    this.form = this.fb.group({
      ID: [null, Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      IDArea: [null, Validators.required],
   
    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        ID: this.Editar.ID,
        Nombre: this.Editar.Nombre,
        Descripcion: String(this.Editar.Descripcion),      
        IDArea: this.Editar.IDArea,
        
      })
    };
    this.listarAreaTrabajo();
  } 

  listarAreaTrabajo() {
    this._servicioAreaTrabajo.get().subscribe({
    next: (data) => {
      console.log('listarAreaTrabajo');
      console.log(data);
      this.listaAreaTrabajo = data;
      this.dataSource.data = this.listaAreaTrabajo;
    },
    error: (e) => {
      // Manejar errores aquí
    }
  });

 

}

  
  agregar() {
    const _equipo: Equipo = {
      ID:  this.form.value.ID == null ? 0 : this.form.value.ID,
      Nombre: this.form.value.Nombre,
      Descripcion: this.form.value.Descripcion,
      IDArea: this.form.value.IDArea
            
    }
    
    if (this.Editar) {
      console.log(_equipo);
      this._servicio.edit(_equipo).subscribe({
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
      
      this._servicio.save(_equipo).subscribe({
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
