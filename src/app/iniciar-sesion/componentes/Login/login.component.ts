import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {Login} from "../../../interface/login";
import {AccesoService} from "../../../services/acceso.service";
import { Router } from '@angular/router';
import {RegistrarComponent} from '../../paginas/registrar/registrar.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    qrValue: string | undefined;
    esCodigo: boolean = false;
    public form: FormGroup = this.fb.group({
        usuario: [''],
        contraseña: [''],
    })

    public formValidacion: FormGroup = this.fbValidacion.group({
        codigo: [''],
    })

    constructor( private fb: FormBuilder,
        private fbValidacion: FormBuilder,
        private _accesoService: AccesoService,
        private dialog: MatDialog,
        private router: Router
        ){}
    Submit(){
        console.log(this.form.value);
    }
    ngOnInit(): void {
        
    }
    validarCodigo(){
        
        this._accesoService.getValidation(this.formValidacion.value.codigo).subscribe({
            next: (data) => {
    
              
                console.log(data.mensage);
                if(data.Token){
                    sessionStorage.setItem('token', data.Token);
                    this.navegarAInicio();
                }else{
                    alert(data.mensage);
                }

                                  
            },
            error: (e) => {
            },
            complete: () => {
            }
        })
    }
    acceder(){
        const _acceder: Login = {
            Usuario: this.form.value.usuario,
            Contrasenia: this.form.value.contraseña,
            
          }
          this._accesoService.post(_acceder).subscribe({
            next: (data) => {
    
              
                console.log(data.mensage);
                if(data.Token){
                    sessionStorage.setItem('token', data.Token);
                    this.esCodigo = true;
                    //this.navegarAInicio();
                }else{
                    alert(data.mensage);
                }

                if (data.QR) {
                    this.qrValue = data.QR;
                }
                    
            },
            error: (e) => {
            },
            complete: () => {
            }
        })
    }
    registrarse(){
        this.dialog.open(RegistrarComponent, {
            disableClose: true
          })
    }
    navegarAInicio() {
        this.router.navigate(['/home']); // Cambia la ruta a '/inicio'
      }
}