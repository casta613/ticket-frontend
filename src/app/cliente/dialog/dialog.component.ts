import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../interface/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: Cliente,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _clienteServicio: ClienteService
    
  ) {
    this.form = this.fb.group({
      ClienteID: [null, Validators.required],
      Nombre: ['', Validators.required],
      Telefono: ['', Validators.required],
   

    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        ClienteID: this.Editar.ClienteID,
        Nombre: this.Editar.Nombre,
        Telefono: String(this.Editar.Telefono),
        
        
      })
    }
   
  }

  agregar() {
    const _cliente: Cliente = {
      ClienteID:  this.form.value.ClienteID == null ? 0 : this.form.value.ClienteID,
      Nombre: this.form.value.Nombre,
      Telefono: this.form.value.Telefono,
      
    }
    
    if (this.Editar) {
      console.log(_cliente);
      this._clienteServicio.edit(_cliente).subscribe({
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
      
      this._clienteServicio.save(_cliente).subscribe({
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
