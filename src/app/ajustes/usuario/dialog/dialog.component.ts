import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from '../../interface/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import {PuestoService} from '../../services/puesto.service';
import {Puesto} from '../../interface/puesto'
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  listaPuesto:Puesto[]=[];

  dataSource = new MatTableDataSource<Puesto>(this.listaPuesto);

  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: Empleado,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _empleadoServicio: EmpleadoService,
    private _puestoServicio:PuestoService,
    
  ) {
    this.form = this.fb.group({
      ID: [null, Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: [null, Validators.required],
      Estado:['', Validators.required],

    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        EmpleadoID: this.Editar.EmpleadoID,
        Nombre: this.Editar.Nombre,
        Telefono: String(this.Editar.Telefono),
        PuestoID: this.Editar.PuestoID,
        Horario: String(this.Editar.Horario),
        
        
      })
    };
    this.mostrarPuestos();
   
  }
  mostrarPuestos() {
      this._puestoServicio.get().subscribe({
      next: (data) => {
        console.log(data);
        this.listaPuesto = data;
        this.dataSource.data = this.listaPuesto;
      },
      error: (e) => {
        // Manejar errores aquí
      }
    });

   

  }
  agregar() {
    const _empleado: Empleado = {
      EmpleadoID:  this.form.value.EmpleadoID == null ? 0 : this.form.value.EmpleadoID,
      Nombre: this.form.value.Nombre,
      Telefono: this.form.value.Telefono,
      PuestoID: Number(this.form.value.PuestoID),
      Horario: this.form.value.Horario
      
    }
    
    if (this.Editar) {
      console.log(_empleado);
      this._empleadoServicio.edit(_empleado).subscribe({
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
      
      this._empleadoServicio.save(_empleado).subscribe({
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
