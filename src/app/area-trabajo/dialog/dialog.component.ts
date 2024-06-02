import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreaTrabajo } from '../../interface/area-trabajo';
import { AreaTrabajoService } from '../../services/area-trabajo.service';

import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;


  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: AreaTrabajo,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _servicio: AreaTrabajoService,
    
  ) {
    this.form = this.fb.group({
      ID: [null, Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
   
    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        ID: this.Editar.ID,
        Nombre: this.Editar.Nombre,
        Descripcion: String(this.Editar.Descripcion),      
        
        
      })
    };
   
  } 

  
  agregar() {
    const _areaTrabajo: AreaTrabajo = {
      ID:  this.form.value.ID == null ? 0 : this.form.value.ID,
      Nombre: this.form.value.Nombre,
      Descripcion: this.form.value.Descripcion,
            
    }
    
    if (this.Editar) {
      console.log(_areaTrabajo);
      this._servicio.edit(_areaTrabajo).subscribe({
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
      
      this._servicio.save(_areaTrabajo).subscribe({
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
