import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Resgistrar} from '../../../interface/registrar';
import {ResgistrarService} from '../../../services/registrar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  form:FormGroup;
  Usuario:string = '';
  Contraseña:string='';
  RespetirContraseña:string ='';


  constructor(
    private dialogoReferencia: MatDialogRef<RegistrarComponent>,
    private fb:FormBuilder,
    private _registrarService:ResgistrarService
  ){
    this.form = this.fb.group({
      Usuario: ['', Validators.required],
      Contraseña: ['', Validators.required],
      RespetirContraseña: ['', Validators.required],
  })
}
registrar() {
  const _registrar: Resgistrar = {
    Usuario:  this.form.value.Usuario ,
    Contrasenia: this.form.value.Contraseña,
    
  }
    if(this.Contraseña === this.RespetirContraseña){
    this._registrarService.save(_registrar).subscribe({
      next: (data) => {

        
          console.log(data);
          
          this.dialogoReferencia.close('agregado')           

      },
      error: (e) => {
      },
      complete: () => {
      }
  }) 
}else{
  alert('las contraseñas no son iguales');
}


  
}
cerrarDialogo() {
  this.dialogoReferencia.close(); // This will close the dialog
}
}
